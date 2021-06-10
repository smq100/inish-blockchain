import React, { Component } from 'react';
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
            chain: []
        };

        this.DoInsert = this.DoInsert.bind(this);
        this.DoMine = this.DoMine.bind(this);
        this.DoValidate = this.DoValidate.bind(this);
    }

    componentDidMount() {
        this.GetChain();
        this.GetTransactions();
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
                this.setState({ chain });
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

                <Status />

                <Send onClick={this.DoInsert} />

                {this.state.transactions.length > 0 ?
                    (<Transactions transactions={this.state.transactions} onClick={this.DoMine}/>) :
                    (<h3 className="text-muted">No pending transactons</h3>)}

                <Blocks chain={this.state.chain} onClick={this.DoValidate} />
            </div>
        );
    }
}

export default App;
