import json
import hashlib
import requests
from urllib.parse import urlparse

from blockchain.blockchain.block import Block
from blockchain.blockchain.transaction import Transaction

_difficulty = 16
_target = (2 ** (256 - _difficulty))
_max_nonce = (2 ** 32)

class Blockchain:
    def __init__(self):
        self.chain = []
        self.nodes = set()

        # Genesis block
        block = Block()
        block.index = 0
        block.nonce = 0
        block.hash = '0'
        block.previous_hash = '0'
        block.transactions = [Transaction('0', '0', 0).get()]

        self.chain = [block.get()]
        self.pending_transactions = []

    def add_transaction(self, sender, receiver, amount, time):
        t = Transaction(sender, receiver, amount).get()
        self.pending_transactions += [t]

        previous_block = self.chain[-1]
        return previous_block['index'] + 1

    def mine_and_add(self):
        data = 0
        for pending in self.pending_transactions:
            data += float(pending['amount'])

        hash = ''
        for new_nonce in range(1, _max_nonce):
            hash = hashlib.sha256(str(new_nonce**2 - data**2).encode()).hexdigest()
            if int(hash, 16) < _target:
                break
            else:
                new_nonce += 1

        block = Block()
        block.index = len(self.chain) + 1
        block.nonce = new_nonce
        block.hash = hash
        block.previous_hash = self.chain[-1]['hash']
        block.transactions = self.pending_transactions

        self.chain += [block.get()]
        self.pending_transactions = []

        return block.get()

    def get_pending_transactions(self):
        return self.pending_transactions

    def _calculate_hash(self, block):
        data = 0
        for pending in block['transactions']:
            data += float(pending['amount'])

        hash = hashlib.sha256(str(float(block['nonce'])**2 - data**2).encode()).hexdigest()
        return hash

    def is_chain_valid(self):
        ret = True
        length = len(self.chain)

        if length == 0:
            ret = False # No genesis block. Should never be here

        elif length == 1:
            ret = True # Treat genesis block as always valid

        elif length == 2:
            hash = self._calculate_hash(self.chain[1])
            ret = bool(int(hash, 16) < _target)

        else:
            previous_block = self.chain[1]
            block_index = 2
            while block_index < length:
                block = self.chain[block_index]
                hash = self._calculate_hash(block)
                if hash[:_difficulty] == ('0' * _difficulty):
                    ret = False
                    break # Block Failed

                if block['previous_hash'] != self._calculate_hash(previous_block):
                    ret = False
                    break # Previous block Failed

                previous_block = block
                block_index += 1

        return ret

    def add_node(self, address):
        parsed_url = urlparse(address)
        self.nodes.add(parsed_url.netloc)

    def replace_chain(self):
        ret = False
        network = self.nodes
        longest_chain = None
        max_length = len(self.chain)
        for node in network:
            response = requests.get(f'http://{node}/get_chain')
            if response.status_code == 200:
                length = response.json()['length']
                chain = response.json()['chain']
                if length > max_length and self.is_chain_valid(chain):
                    max_length = length
                    longest_chain = chain
        if longest_chain:
            self.chain = longest_chain
            ret = True

        return ret
