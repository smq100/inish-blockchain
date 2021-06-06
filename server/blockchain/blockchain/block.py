import datetime
import hashlib

class Block:
    def __init__(self):
        self.index = 0
        self.nonce = 0
        self.hash = ''
        self.merkle_root = ''
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
                'timestamp': f'{self.timestamp:%Y-%m-%d %H:%M}'}

    def calculate_hash(self):
        return hashlib.sha256(str(self.merkle_root + str(self)).encode()).hexdigest()

    def calculate_merkle_root(self, hash_list):
        if len(hash_list) == 0:
            raise ValueError('No transactions')
        elif len(hash_list) == 1:
            self.merkle_root = hash_list[0]
            return self.merkle_root

        def _hash_it(first, second):
            data = first + second
            return hashlib.sha256(str(data).encode()).hexdigest()

        new_hash_list = []
        for i in range(0, len(hash_list)-1, 2):
            new_hash_list += [_hash_it(hash_list[i], hash_list[i+1])]

        if len(hash_list) % 2 == 1: # odd, hash last item twice
            new_hash_list += [_hash_it(hash_list[-1], hash_list[-1])]

        # Hash pairs of items recursively until a single value is obtained
        return self.calculate_merkle_root(new_hash_list)

