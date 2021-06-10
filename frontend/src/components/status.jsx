import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';


class Status extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Container>
                <br />
                <Row>
                    <Col sm="6">
                        <h5 className="text-muted mt-4">Number of Blocks Mined</h5>
                        <hr />
                        <h5><b>{this.props.length}</b></h5>
                    </Col>
                    <Col sm="6"> <br />
                        <h5 className="text-muted">Node Address</h5>
                        <hr />
                        <h5>{this.props.address}</h5>
                    </Col >
                </Row>
                <br /><br />
            </Container>
        );
    }
}

export default Status;
