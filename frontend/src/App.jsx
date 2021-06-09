import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import Header from './components/header'
import Status from './components/status'
import Send from './components/send'
import Transactions from './components/transactions'
import Blocks from './components/blocks'

const endpoint_chain = '/get_chain'
const endpoint_pending = '/get_pending'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            chain: []
        };

        // this.sendCallback = this.sendCallback.bind(this);
    }

    componentDidMount() {
        axios.get(endpoint_pending)
            .then(response => {
                const transactions = response.data.transactions;
                this.setState({ transactions });
            },
                error => {
                    console.log(error);
                }
            )

        axios.get(endpoint_chain)
            .then(response => {
                const chain = response.data.chain;
                this.setState({ chain });
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

                <Send onCallback={this.sendCallback} />

                {this.state.transactions.length > 0 ?
                    (<Transactions transactions={this.state.transactions}/>) :
                    (<h3 className="text-muted">No pending transactons</h3>)}

                <Blocks chain={this.state.chain} />
            </div>
        );
    }
}

export default App;
