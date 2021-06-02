import datetime


class Transaction:
    def __init__(self, sender, receiver, amount):
        self.sender = sender
        self.receiver = receiver
        self.amount = amount
        self.timestamp = datetime.datetime.now()

    def __str__(self):
        return vars(self)

    def __repr__(self):
        return '<Transaction object>'

    def get(self):
        return {'sender': self.sender,
                'receiver': self.receiver,
                'amount': self.amount,
                'timestamp': str(self.timestamp)}
