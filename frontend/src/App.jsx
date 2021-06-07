
import React, { Component } from 'react';
import './App.css';
import Status from './components/status'
import Send from './components/send'
import Transactions from './components/transactions'
import Blocks from './components/blocks'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          refresh: false
        };

        this.sendCallback = this.sendCallback.bind(this);
    }

    sendCallback() {
        this.setState(state => ({
            refresh: !state.refresh
          }));
          console.log('Callback reached')
    }

    render() {
        return (
            <div className="App">
                <Status />
                <Send onCallback = {this.sendCallback} />
                <Transactions onCallback = {this.sendCallback} refresh = {this.state.refresh} />
                <Blocks refresh = {this.state.refresh} />
            </div>
        );
    }
}

export default App;
