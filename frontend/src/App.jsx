import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import axios from 'axios';

import './App.css';
import Header from './components/header'
import Status from './components/status'
import Send from './components/send'
import Transactions from './components/transactions'
import Blocks from './components/blocks'

const endpointChain = '/get_chain'
const endpointPending = '/get_pending'
const endpointAdd = '/add_transaction'
const endpointMine = '/mine_block'
const endpointvalid = '/is_valid'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            chain: [],
            alert: '',
            show: false
        };

        this.DoInsert = this.DoInsert.bind(this);
        this.DoMine = this.DoMine.bind(this);
        this.DoValidate = this.DoValidate.bind(this);
    }

    componentDidMount() {
        this.GetTransactions();
        this.GetChain();
    }

    GetTransactions() {
        axios.get(endpointPending)
            .then(response => {
                const transactions = response.data.transactions;
                this.setState({ transactions });
            },
                error => {
                    console.log(error);
                }
            )
    }

    GetChain() {
        axios.get(endpointChain)
            .then(response => {
                const chain = response.data.chain;
                const address = response.data.chain[0].transactions[0].receiver;
                const length = response.data.length;
                this.setState({ chain, address, length });
            },
                error => {
                    console.log(error);
                }
            )
    }

    DoInsert(data) {
        axios.post(endpointAdd, data)
            .then(res => {
                console.log(res);
                console.log(res.data);

                this.GetTransactions();

                this.setState({ show: true, alert: 'Success' });
            },
                error => {
                    console.log(error);
                }
            )
    }

    DoMine() {
        axios.get(endpointMine)
            .then(res => {
                console.log(res);
                console.log(res.data);

                this.GetTransactions();
                this.GetChain();
            },
                error => {
                    console.log(error);
                }
            )
    }

    DoValidate() {
        axios.get(endpointvalid)
            .then(res => {
                console.log(res);
                console.log(res.data);
            },
                error => {
                    console.log(error);
                }
            )
    }

    render() {
        return (
            <div className="App">
                <Header />

                <Alert variant="success" show={this.state.show} dismissible>
                    <Alert.Heading>{this.state.alert}</Alert.Heading>
                    <p>Blah</p>
                </Alert>

                <Status address={this.state.address} length={this.state.length} />

                <Send address={this.state.address} onClick={this.DoInsert} />

                {this.state.transactions.length > 0 ?
                    (<Transactions transactions={this.state.transactions} onClick={this.DoMine} />) :
                    (<h3 className="text-muted">No pending transactions</h3>)}

                <Blocks chain={this.state.chain} onClick={this.DoValidate} />
            </div>
        );
    }
}

export default App;
