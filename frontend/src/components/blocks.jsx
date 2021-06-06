
import React, { Component } from 'react';
import { Container, Form, Button, Col } from 'react-bootstrap';
import axios from 'axios';

const endpoint_chain = '/get_chain'
const endpoint_valid = '/is_valid'

class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chain: [],
        }
    }

    componentDidMount() {
        axios.get(endpoint_chain)
            .then(response => {
                const chain = response.data.chain;
                this.setState({chain});
            },
            error => {
                console.log(error);
            }
        )
    }

    handleSubmit(event) {
        event.preventDefault();

        axios.get(endpoint_valid)
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
                <h3 className="text-muted mt-20"><b>Blocks</b></h3>
                {this.state.chain.slice(0).reverse().map(((b, idx) =>
                    <div key={idx} className="text-start">
                        <h5 className="text-muted">Index: <b style={{ color: '#007bff' }}>{b.index}</b></h5>
                        <h5 className="text-muted">Nonce: <b style={{ color: '#007bff' }}>{b.nonce}</b></h5>
                        <h5 className="text-muted">Transactions: <b style={{ color: '#007bff' }}>{b.transactions.length}</b></h5>
                        <h5 className="text-muted">Hash: <b style={{ color: '#007bff' }}>{b.hash}</b></h5>
                        <h5 className="text-muted">Previous Hash: <b style={{ color: '#007bff' }}>{b.previous_hash}</b></h5>
                        <h5 className="text-muted">Time: <b style={{ color: '#007bff' }}>{b.timestamp}</b></h5>
                        <hr /><br />
                    </div>
                ))}
                <Form onSubmit={this.handleSubmit}>
                    <Col>
                        <Button variant="primary mt-4" type="submit">Validate</Button>
                    </Col>
                </Form>
                <br /><br /><br />
            </Container>
        );
    }
}

export default Transactions;
