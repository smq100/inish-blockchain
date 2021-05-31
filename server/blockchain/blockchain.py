import datetime
import json
import hashlib
import requests
from urllib.parse import urlparse

class Blockchain:
    def __init__(self):
        self.chain = []
        self.transactions = []
        self.nodes = set()

        self.create_block(nonce = 1, previous_hash = '0')

    def add_transaction(self, sender, receiver, amount, time):
        self.transactions.append({'sender': sender,
                                  'receiver': receiver,
                                  'amount': amount,
                                  'time': str(datetime.datetime.now())})

        previous_block = self.get_last_block()
        return previous_block['index'] + 1

    def create_block(self, nonce, previous_hash):
        block = {'index': len(self.chain) + 1,
                 'timestamp': str(datetime.datetime.now()),
                 'nonce': nonce,
                 'previous_hash': previous_hash,
                 'transactions': self.transactions}

        self.transactions = []
        self.chain += [block]

        return block

    def do_proof_of_work(self, previous_nonce):
        new_nonce = 1
        check_nonce = False
        while check_nonce is False:
            hash_operation = hashlib.sha256(str(new_nonce**2 - previous_nonce**2).encode()).hexdigest()
            if hash_operation[:4] == '0000':
                check_nonce = True
            else:
                new_nonce += 1

        return new_nonce

    def get_last_block(self):
        return self.chain[-1]

    def get_hash(self, block):
        encoded_block = json.dumps(block, sort_keys=True).encode()
        hash = hashlib.sha256(encoded_block).hexdigest()

        return hash

    def is_chain_valid(self, chain):
        previous_block = chain[0]
        block_index = 1
        while block_index < len(chain):
            block = chain[block_index]
            if block['previous_hash'] != self.get_hash(previous_block):
                return False
            previous_nonce = previous_block['nonce']
            nonce = block['nonce']
            hash_operation = hashlib.sha256(str(nonce**2 - previous_nonce**2).encode()).hexdigest()
            if hash_operation[:4] != '0000':
                return False
            previous_block = block
            block_index += 1

        return True

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
