import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
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
            .then(res => {
                const length = res.data.length;
                const address = res.data.chain[1].transactions[0].receiver;
                this.setState({ length, address });
            })
    }
    render() {
        return (
            <Container>
                <br />
                <Row>
                    <Col sm="6">
                        <h5 className="text-muted pt-1"><div><i className="fa fa-cubes"></i></div> Number of Blocks Mined</h5><hr />
                        <h5 style={{ color: '#007bff' }}>#<b>{this.state.length} </b></h5>
                    </Col>
                    <Col sm="6"> <br />
                        <h5 className="text-muted pt-1"><div>Node Address <a href={endpoint}><i className="fa fa-refresh"></i></a></div></h5><hr />
                        <h5 style={{ color: '#007bff' }}>{this.state.address}</h5>
                    </Col >
                </Row>
                <br /><br /><br />
            </Container>
        );
    }
}

export default Status;
