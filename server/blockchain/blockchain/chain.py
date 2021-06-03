import json
import hashlib
import requests
from urllib.parse import urlparse

from blockchain.blockchain.block import Block
from blockchain.blockchain.transaction import Transaction

_DIFFICULTY = 4

class Blockchain:
    def __init__(self):
        self.chain = []
        self.nodes = set()

        # Genesis transaction
        self.pending_transactions = [Transaction('0', '0', 0).get()]

        # Genesis block
        self.create_block(nonce = 1, hash = '0', previous_hash = '0')

    def add_transaction(self, sender, receiver, amount, time):
        t = Transaction(sender, receiver, amount).get()
        self.pending_transactions += [t]

        previous_block = self.get_last_block()
        return previous_block['index'] + 1

    def do_proof_of_work(self):
        hash = ''
        new_nonce = 1
        check_nonce = True

        data = 0
        for pending in self.pending_transactions:
            data += float(pending['amount'])

        while check_nonce:
            hash = hashlib.sha256(str(new_nonce**2 - data**2).encode()).hexdigest()
            if hash[:_DIFFICULTY] == ('0' * _DIFFICULTY):
                check_nonce = False
            else:
                new_nonce += 1

        return hash, new_nonce

    def create_block(self, nonce, hash, previous_hash):
        b = Block(len(self.chain)+1, nonce, hash, previous_hash, self.pending_transactions)
        self.chain += [b.get()]
        self.pending_transactions = []

        return b.get()

    def get_pending_transactions(self):
        return self.pending_transactions

    def get_last_block(self):
        return self.chain[-1]

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
            print(hash)
            ret = bool(hash[:_DIFFICULTY] == ('0' * _DIFFICULTY))

        else:
            previous_block = self.chain[1]
            block_index = 2
            while block_index < length:
                block = self.chain[block_index]
                hash = self._calculate_hash(block)
                if hash[:_DIFFICULTY] == ('0' * _DIFFICULTY):
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
