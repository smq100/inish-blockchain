import datetime


class Block:
    def __init__(self, index, nonce, hash, previous_hash, transactions):
        self.index = index
        self.nonce = nonce
        self.hash = hash
        self.previous_hash = previous_hash
        self.transactions = transactions
        self.timestamp = datetime.datetime.now()

    def __str__(self):
        return vars(self)

    def __repr__(self):
        return '<Block object>'

    def get(self):
        return {'index': self.index,
                'nonce': self.nonce,
                'hash': self.hash,
                'previous_hash': self.previous_hash,
                'transactions': self.transactions,
                'timestamp': str(self.timestamp)}
