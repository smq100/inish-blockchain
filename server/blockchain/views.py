
import datetime
import json
from uuid import uuid4

from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt

import blockchain.blockchain.manager as mgr


# Create our Blockchain
node_address = str(uuid4()).replace('-', '')
root_node = 'e36f0158f0aed45b3bc755dc52ed4560d'

@csrf_exempt
def add_transaction(request):
    if request.method == 'POST':
        received_json = json.loads(request.body)
        transaction_keys = ['sender', 'receiver', 'amount','time']
        if not all(key in received_json for key in transaction_keys):
            return 'Some elements of the transaction are missing', HttpResponse(status=400)
        index = mgr.blockchain.add_transaction(received_json['sender'], received_json['receiver'], received_json['amount'], received_json['time'])
        response = {'message': f'This transaction will be added to Block {index}'}

    return JsonResponse(response)

def mine_block(request):
    if request.method == 'GET':
        previous_block = mgr.blockchain.get_last_block()
        previous_nonce = previous_block['nonce']
        nonce = mgr.blockchain.do_proof_of_work(previous_nonce)
        previous_hash = mgr.blockchain.get_hash(previous_block)
        mgr.blockchain.add_transaction(sender=root_node, receiver=node_address, amount=1.15, time=str(datetime.datetime.now()))
        block = mgr.blockchain.create_block(nonce, previous_hash)
        response = {'message': 'Congratulations, you just mined a block!',
                    'index': block['index'],
                    'timestamp': block['timestamp'],
                    'nonce': block['nonce'],
                    'previous_hash': block['previous_hash'],
                    'transactions': block['transactions']}

    return JsonResponse(response)

def get_chain(request):
    if request.method == 'GET':
        response = {'chain': mgr.blockchain.chain,
                    'length': len(mgr.blockchain.chain)}

    return JsonResponse(response)

def get_pending_transactions(request):
    if request.method == 'GET':
        response = {'transactions': mgr.blockchain.pending_transactions,
                    'length': len(mgr.blockchain.pending_transactions)}

    return JsonResponse(response)

def is_valid(request):
    if request.method == 'GET':
        is_valid = mgr.blockchain.is_chain_valid(mgr.blockchain.chain)
        if is_valid:
            response = {'message': 'All good. The Blockchain is valid.'}
        else:
            response = {'message': 'Houston, we have a problem. The Blockchain is not valid.'}

    return JsonResponse(response)

def replace_chain(request):
    if request.method == 'GET':
        is_chain_replaced = mgr.blockchain.replace_chain()
        if is_chain_replaced:
            response = {'message': 'The nodes had different chains so the chain was replaced by the longest one.',
                        'new_chain': mgr.blockchain.chain}
        else:
            response = {'message': 'All good. The chain is the largest one.',
                        'actual_chain': mgr.blockchain.chain}

    return JsonResponse(response)

@csrf_exempt
def connect_node(request):
    if request.method == 'POST':
        received_json = json.loads(request.body)
        nodes = received_json.get('nodes')

        if nodes is None:
            return "No node", HttpResponse(status=400)

        for node in nodes:
            mgr.blockchain.add_node(node)

        response = {'message': 'All the nodes are now connected. The Sudocoin Blockchain now contains the following nodes:',
                    'total_nodes': list(mgr.blockchain.nodes)}

    return JsonResponse(response)

def server_root(request):
    html = '<html><body><h3>You have reached the server</h3></body></html>'
    return HttpResponse(html)
