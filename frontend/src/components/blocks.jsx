
import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';

const endpoint = '/get_chain'

class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chain: [],
        }
    }

    componentDidMount() {
        axios.get(endpoint)
            .then(res => {
                const chain = res.data.chain;
                this.setState({ chain });
            })
    }

    render() {
        return (
            <Container>
                <h3 className="text-muted mt-20"><b>Blocks</b></h3>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Nonce</th>
                            <th>Previous Hash</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.chain.slice(0).reverse().map((t =>
                                <tr key={t}>
                                    <td><b style={{color:'#007bff'}}>{t.index}</b></td>
                                    <td><b style={{color:'#007bff'}}>{t.nonce}</b></td>
                                    <td><b style={{color:'#007bff'}}>0x{t.previous_hash.toString().slice(0,6)}...{t.previous_hash.toString().slice(-6)}</b></td>
                                    <td><b style={{color:'#007bff'}}>{t.timestamp}</b></td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </Container>
        );
    }
}

export default Transactions;
