import datetime


class Transaction:
    def __init__(self, sender, receiver, amount):
        self.sender = sender
        self.receiver = receiver
        self.amount = amount
        self.timestamp = datetime.datetime.now()

    def __repr__(self):
        return '<Transaction>'

    def get(self):
        return {'sender': self.sender,
                'receiver': self.receiver,
                'amount': self.amount,
                'timestamp': str(self.timestamp)}