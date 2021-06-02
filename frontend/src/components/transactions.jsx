
import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';

const endpoint = '/get_pending'

class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
        }
    }

    componentDidMount() {
        axios.get(endpoint)
            .then(response => {
                const transactions = response.data.transactions;
                this.setState({ transactions });
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
                        {this.state.transactions.slice(0).reverse().map(((t, idx) =>
                            <tr key={idx}>
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
