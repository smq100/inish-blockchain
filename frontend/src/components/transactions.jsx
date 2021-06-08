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

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get(endpoint_pending)
            .then(response => {
                const transactions = response.data.transactions;
                this.setState({transactions});
                },
                error => {
                    console.log(error);
                }
            )
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.refresh !== this.props.refresh) {
            axios.get(endpoint_pending)
                .then(response => {
                    const transactions = response.data.transactions;
                    this.setState({transactions});
                },
                    error => {
                        console.log(error);
                    }
                )
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        axios.get(endpoint_mine)
            .then(res => {
                console.log(res);
                console.log(res.data);

                this.props.onCallback();
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
                        <hr />
                        <div className="row">
                            <div className="col-1">From:</div>
                            <div className="col">{t.sender}</div>
                        </div>
                        <div className="row">
                            <div className="col-1">To:</div>
                            <div className="col">{t.receiver}</div>
                        </div>
                        <div className="row">
                            <div className="col-1">Data:</div>
                            <div className="col">{t.data}</div>
                        </div>
                        <div className="row">
                            <div className="col-1">Hash:</div>
                            <div className="col">{t.hash}</div>
                        </div>
                        <div className="row">
                            <div className="col-1">Time:</div>
                            <div className="col">{t.timestamp}</div>
                        </div>
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
