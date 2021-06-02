import datetime


class Block:
    def __init__(self, index, nonce, previous_hash, transactions):
        self.index = index
        self.nonce = nonce
        self.previous_hash = previous_hash
        self.timestamp = datetime.datetime.now()
        self.transactions = transactions

    def __str__(self):
        return vars(self)

    def __repr__(self):
        return '<Block object>'

    def get(self):
        return {'index': self.index,
                'nonce': self.nonce,
                'previous_hash': self.previous_hash,
                'transactions': self.transactions,
                'timestamp': str(self.timestamp)}
