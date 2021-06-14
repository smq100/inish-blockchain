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
        this.DismissMsg = this.DismissAlerts.bind(this);
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

                this.setState({ showTx: true, showMine: false, showVal: false, alert: res.data.message });
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

                this.setState({ showTx: false, showMine: true, showVal: false, alert: res.data.message });
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

                this.setState({ showTx: false, showMine: false, showVal: true, alert: res.data.message });
            },
                error => {
                    console.log(error);
                }
            )
    }

    DismissAlerts() {
        this.setState({ showTx: false, showMine: false, showVal: false, alert: '' });
    }

    render() {
        return (
            <div className="App">
                <Header />

                <Status address={this.state.address} length={this.state.length} />

                { this.state.showTx ?
                <Alert variant="success" fade="false" onClose={this.DismissAlerts}>
                    <Alert.Heading>Successfully Added Transaction</Alert.Heading>
                    <p>{this.state.alert}</p>
                </Alert> : ''}

                <Send address={this.state.address} onClick={this.DoInsert} />

                {this.state.transactions.length > 0 ?
                    (<Transactions transactions={this.state.transactions} onClick={this.DoMine} />) :
                    (<h3 className="text-muted">No pending transactions</h3>)}

                { this.state.showMine ?
                <Alert variant="success" fade="false" onClose={this.DismissAlerts}>
                    <Alert.Heading>Successfully Mined Block</Alert.Heading>
                    <p>{this.state.alert}</p>
                </Alert> : ''}

                <Blocks chain={this.state.chain} onClick={this.DoValidate} />

                { this.state.showVal ?
                <Alert variant="success" fade="false" onClose={this.DismissAlerts}>
                    <Alert.Heading>Block Validity Checked</Alert.Heading>
                    <p>{this.state.alert}</p>
                </Alert> : ''}
            </div>
        );
    }
}

export default App;
