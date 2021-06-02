
import React, { Component } from 'react';
import './App.css';
import Status from './components/status'
import Send from './components/send'
import Transactions from './components/transactions'
import Blocks from './components/blocks'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Status />
                <Send />
                <Transactions />
                <Blocks />
            </div>
        );
    }
}

export default App;
