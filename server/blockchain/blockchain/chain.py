import requests
from urllib.parse import urlparse
from uuid import uuid4

from blockchain.blockchain.block import Block
from blockchain.blockchain.transaction import Transaction
from blockchain import utils

_logger = utils.get_logger()

_difficulty = 16
_target = (2 ** (256 - _difficulty))
_max_nonce = (2 ** 32)

# Create our Blockchain
node_address = str(uuid4()).replace('-', '')
root_node = 'e36f0158f0aed45b3bc755dc52ed4560d'

class Blockchain:
    def __init__(self):
        self.chain = []
        self.chain_text = []
        self.nodes = set()

        # Genesis block
        block = Block()
        block.index = 1
        block.nonce = 0
        block.hash = '0'
        block.merkle_root = '0'
        block.previous_hash = '0'
        block.difficulty = _difficulty
        block.transactions = [Transaction('0', node_address , 0).get()]

        self.chain = [block]
        self.chain_text = [block.get()]
        self.pending_transactions = []

    def add_transaction(self, sender, receiver, data, time):
        t = Transaction(sender, receiver, data).get()
        self.pending_transactions += [t]

        previous_block = self.chain[-1]

        _logger.info(f'{__name__}: Added transaction: s:{sender}, r:{receiver} d:{data}')

        return previous_block.index + 1

    def mine_and_add(self):
        ret = None

        if len(self.pending_transactions) > 0:
            block = Block()
            block.index = len(self.chain) + 1
            block.nonce = 0
            block.hash = ''
            block.previous_hash = self.chain[-1].hash
            block.transactions = self.pending_transactions
            block.difficulty = _difficulty

            tx_hashes = [n['hash'] for n in block.transactions]
            block.calculate_merkle_root(tx_hashes)

            hash = ''
            for new_nonce in range(1, _max_nonce):
                block.nonce = new_nonce
                hash = block.calculate_hash()
                if int(hash, 16) < _target:
                    block.hash = hash
                    break
                else:
                    new_nonce += 1

            self.chain += [block]
            self.chain_text += [block.get()]
            self.pending_transactions = []

            _logger.info(f'{__name__}: Successfully mined block {block.index}')

            ret = block.get()

        return ret

    def is_valid(self):
        ret = True
        length = len(self.chain)

        if length == 0:
            ret = False # No genesis block. Should never be here

        elif length == 1:
            ret = True # Treat genesis block as always valid

        elif length == 2:
            block = self.chain[1]
            tx_hashes = [n['hash'] for n in block.transactions]
            block.calculate_merkle_root(tx_hashes)
            hash = block.calculate_hash()
            ret = (hash == self.chain[1].hash)

        else:
            previous_block = self.chain[1]
            block_index = 2
            while block_index < length:
                block = self.chain[block_index]
                tx_hashes = [n['hash'] for n in block.transactions]
                block.calculate_merkle_root(tx_hashes)

                hash = block.calculate_hash()
                if hash != self.chain[block_index].hash:
                    ret = False
                    break # Block Failed

                if block.previous_hash != previous_block.hash:
                    ret = False
                    break # Previous block Failed

                previous_block = block
                block_index += 1

        return ret

    def get_pending_transactions(self):
        return self.pending_transactions

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
                if length > max_length and self.is_valid(chain):
                    max_length = length
                    longest_chain = chain
        if longest_chain:
            self.chain = longest_chain
            ret = True

        return ret
