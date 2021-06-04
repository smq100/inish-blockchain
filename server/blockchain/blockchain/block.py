import datetime
import hashlib

class Block:
    def __init__(self):
        self.index = 0
        self.nonce = 0
        self.hash = ''
        self.previous_hash = ''
        self.transactions = []
        self.timestamp = datetime.datetime.now()

    def __str__(self):
        return str({'index': self.index,
                'nonce': self.nonce,
                'previous_hash': self.previous_hash,
                'timestamp': self.timestamp})

    def __repr__(self):
        return '<Block object>'

    def get(self):
        return {'index': self.index,
                'nonce': self.nonce,
                'hash': self.hash,
                'previous_hash': self.previous_hash,
                'transactions': self.transactions,
                'timestamp': str(self.timestamp)}

    def calculate_hash(self):
        hash = hashlib.sha256(str(self).encode()).hexdigest()
        return hash
