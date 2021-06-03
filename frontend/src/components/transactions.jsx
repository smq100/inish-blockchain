
import React, { Component } from 'react';
import { Container, Form, Table, Button, Col } from 'react-bootstrap';
import axios from 'axios';

const endpoint_pending = '/get_pending'
const endpoint_mine = '/mine_block'

class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
        }
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
    }

    handleSubmit(event) {
        event.preventDefault();

        axios.get(endpoint_mine)
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
            <Container>
                <br />
                <h3 className="text-muted mt-20"><b>Pending Transactions</b></h3>
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
                <Form onSubmit={this.handleSubmit}>
                    <Col>
                        <Button variant="primary mt-4" type="submit">Mine</Button>
                    </Col>
                </Form>
                <br /><br /><br />
            </Container>
        );
    }
}

export default Transactions;
