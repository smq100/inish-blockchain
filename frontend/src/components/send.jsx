import React, { Component } from 'react';
import { Form, Container, Col, Row, Button } from 'react-bootstrap';
import axios from 'axios';

const postEndpoint = '/add_transaction'
const getEndpoint = '/get_chain'

class Send extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipient: '',
            amount: 0,
            time: '',
            sender: '',
        }

        this.handleRecipient = this.handleRecipient.bind(this);
        this.handleAmount = this.handleAmount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleRecipient(event) {
        this.setState({ recipient: event.target.value });
    }

    handleAmount(event) {
        this.setState({ amount: event.target.value });
    }

    componentDidMount() {
        axios.get(getEndpoint)
            .then(res => {
                const sender = res.data.chain[1].transactions[0].receiver;
                this.setState({ sender });
            })
    }

    handleSubmit(event) {
        event.preventDefault();

        axios.post(postEndpoint, {
            "sender": this.state.sender,
            "receiver": this.state.recipient,
            "amount": this.state.amount,
            "time": this.state.time
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
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
                        <Form.Label column sm="1">Amount</Form.Label>
                        <Col sm="0">
                            <Form.Control onChange={this.handleAmount} placeholder="Amount" value={this.state.amount} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col>
                            <Button variant="primary mt-4" type="submit">Send</Button>
                        </Col>
                    </Form.Group>
                </Form>
                <br /><br />
            </Container>
        );
    }
}

export default Send;
