import datetime
import hashlib


class Transaction:
    def __init__(self, sender, receiver, data):
        self.sender = sender
        self.receiver = receiver
        self.data = data
        self.hash = self.calculate_hash()
        self.timestamp = datetime.datetime.now()

    def __str__(self):
        return vars(self)

    def __repr__(self):
        return '<Transaction object>'

    def get(self):
        return {'sender': self.sender,
                'receiver': self.receiver,
                'data': self.data,
                'timestamp': f'{self.timestamp:%Y-%m-%d %H:%M}',
                'hash': self.hash }

    def calculate_hash(self):
        hash = hashlib.sha256(str(self.data).encode()).hexdigest()
        return hash
