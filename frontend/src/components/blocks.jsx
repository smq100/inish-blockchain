
import React, { Component } from 'react';
import { Container, Form, Table, Button, Col } from 'react-bootstrap';
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
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Nonce</th>
                            <th>Transactions</th>
                            <th>Hash</th>
                            <th>Previous Hash</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.chain.slice(0).reverse().map(((b, idx) =>
                            <tr key={idx}>
                                <td><b style={{color:'#007bff'}}>{b.index}</b></td>
                                <td><b style={{color:'#007bff'}}>{b.nonce}</b></td>
                                <td><b style={{color:'#007bff'}}>{b.transactions.length}</b></td>
                                <td><b style={{color:'#007bff'}}>{b.hash.toString().slice(0,15)}...</b></td>
                                <td><b style={{color:'#007bff'}}>{b.previous_hash.toString().slice(0,15)}...</b></td>
                                <td><b style={{color:'#007bff'}}>{b.timestamp}</b></td>
                            </tr>
                            ))}
                    </tbody>
                </Table>
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
