import React, { Component } from 'react';
import { Container, Form, Button, Col } from 'react-bootstrap';

class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.onClick();
    }

    render() {
        return (
            <Container>
                <br />
                <h3 className="text-muted mt-20"><b>Pending Transactions</b></h3>
                {this.props.transactions.slice(0).reverse().map(((t, idx) =>
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
