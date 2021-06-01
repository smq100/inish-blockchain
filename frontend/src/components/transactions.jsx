
import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';

const endpoint = '/get_chain'

class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chain: [],
        }
    }

    componentDidMount() {
        axios.get(endpoint)
            .then(response => {
                const chain = response.data.chain;
                this.setState({ chain });
            })
    }

    render() {
        return (
            <Container>
                <h3 className="text-muted mt-20"><b>Transactions</b></h3>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Amount</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.chain.slice(0).reverse().map((chain, idx1) =>
                            chain.transactions.map((t, idx2) =>
                                <tr key={idx2}>
                                    <td><b style={{ color: '#007bff' }}>{t.sender}</b></td>
                                    <td><b style={{ color: '#007bff' }}>{t.receiver}</b></td>
                                    <td><b style={{ color: '#007bff' }}>{parseFloat(t.amount).toFixed(5)} </b></td>
                                    <td><b style={{ color: '#007bff' }}>{t.timestamp}</b></td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </Container>
        );
    }
}

export default Transactions;
