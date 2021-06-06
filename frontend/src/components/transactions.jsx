
import React, { Component } from 'react';
import { Container, Form, Button, Col } from 'react-bootstrap';
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
                {this.state.transactions.slice(0).reverse().map(((t, idx) =>
                    <div key={idx} className="text-start">
                        <h5 className="text-muted">From: <b style={{ color: '#007bff' }}>{t.sender}</b></h5>
                        <h5 className="text-muted">To: <b style={{ color: '#007bff' }}>{t.receiver}</b></h5>
                        <h5 className="text-muted">Data: <b style={{ color: '#007bff' }}>{t.data}</b></h5>
                        <h5 className="text-muted">Hash: <b style={{ color: '#007bff' }}>{t.hash}</b></h5>
                        <h5 className="text-muted">Time: <b style={{ color: '#007bff' }}>{t.timestamp}</b></h5>
                        <hr /><br />
                    </div>
                ))}
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
