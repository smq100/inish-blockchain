import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const endpoint = '/get_chain'

class Status extends Component {
    constructor(props) {
        super(props);
        this.state = {
            length: [],
            address: '',
        }
    }

    componentDidMount() {
        axios.get(endpoint)
            .then(
                response => {
                    const length = response.data.length;
                    const address = response.data.chain[0].transactions[0].receiver;
                    this.setState({length, address});
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
                <Row>
                    <Col sm="6">
                        <h5 className="text-muted mt-4">Number of Blocks Mined</h5>
                        <hr />
                        <h5><b>{this.state.length}</b></h5>
                    </Col>
                    <Col sm="6"> <br />
                        <h5 className="text-muted">Node Address</h5>
                        <hr />
                        <h5>{this.state.address}</h5>
                    </Col >
                </Row>
                <br /><br />
            </Container>
        );
    }
}

export default Status;
