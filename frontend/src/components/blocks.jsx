import React, { Component } from 'react';
import { Container, Form, Button, Col } from 'react-bootstrap';

class Blocks extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.onClick();
    }

    render() {
        return (
            <Container>
                <br />
                <h3 className="text-muted mt-20"><b>Blocks</b></h3>
                {this.props.chain.slice(0).reverse().map(((b, idx) =>
                    <div key={idx} className="text-start">
                        <hr />
                        <div className="row">
                            <div className="col-1">Index:</div>
                            <div className="col">{b.index}</div>
                        </div>
                        <div className="row">
                            <div className="col-1">Nonce:</div>
                            <div className="col">{b.nonce}</div>
                        </div>
                        <div className="row">
                            <div className="col-1">Trans:</div>
                            <div className="col">{b.transactions.length}</div>
                        </div>
                        <div className="row">
                            <div className="col-1">Root:</div>
                            <div className="col">{b.merkle_root}</div>
                        </div>
                        <div className="row">
                            <div className="col-1">Hash:</div>
                            <div className="col">{b.hash}</div>
                        </div>
                        <div className="row">
                            <div className="col-1">Previous:</div>
                            <div className="col">{b.previous_hash}</div>
                        </div>
                        <div className="row">
                            <div className="col-1">Difficulty:</div>
                            <div className="col">{b.difficulty}</div>
                        </div>
                        <div className="row">
                            <div className="col-1">Version:</div>
                            <div className="col">{b.version}</div>
                        </div>
                        <div className="row">
                            <div className="col-1">Time:</div>
                            <div className="col">{b.timestamp}</div>
                        </div>
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

export default Blocks;
