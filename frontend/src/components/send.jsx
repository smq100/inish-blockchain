import React, { Component } from 'react';
import { Form, Container, Col, Row, Button } from 'react-bootstrap';
import axios from 'axios';

const postEndpoint = '/add_transaction'

class Send extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipient: '',
            data: 0,
            time: '',
            sender: '',
        }

        this.handleRecipient = this.handleRecipient.bind(this);
        this.handleData = this.handleData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleRecipient(event) {
        this.setState({ recipient: event.target.value });
    }

    handleData(event) {
        this.setState({ data: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        axios.post(postEndpoint, {
            "sender": this.state.sender,
            "receiver": this.state.recipient,
            "data": this.state.data,
            "time": this.state.time
        })
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
                <h3 className="text-muted"><b>SudoCoin</b></h3>
                <h5 className="text-muted mb-4"><b>Send dummy crypto to anyone</b> </h5>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group as={Row}>
                        <Form.Label column sm="1">Recipient</Form.Label>
                        <Col sm="0">
                            <Form.Control onChange={this.handleRecipient} value={this.state.recipient} placeholder="Recipient Address" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="1">Data</Form.Label>
                        <Col sm="0">
                            <Form.Control onChange={this.handleData} placeholder="Data" value={this.state.data} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col>
                            <Button variant="primary mt-4" type="submit">Post</Button>
                        </Col>
                    </Form.Group>
                </Form>
                <br /><br /><br />
            </Container>
        );
    }
}

export default Send;
