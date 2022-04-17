import React, {Component} from 'react';
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";

class AttendantLogs extends Component {
    constructor() {
        super();

        this.state = {
            attendant_logs: [],
        }
    }

    getData = () => {
        let session = JSON.parse(window.sessionStorage.getItem('session'))
        axios.get(`/api/attendant-logs`, {headers: { Authorization: `Bearer ${session.token}` }})
            .then(response => {
                this.setState({attendant_logs:response.data.data})
            })
            .catch(error => {
                global.toast.fire({
                    icon: 'error',
                    title: error.response.data.message
                })
            });
    }

    componentDidMount() {
        // this.getData()
        setInterval(this.getData, 30000)
    }

    render() {
        return (
            <div className="container-fluid">

                <Row>
                    <Col>
                        <nav
                            className="breadcrumb justify-content-sm-start justify-content-center text-center text-light bg-dark ">
                            <Link className="breadcrumb-item text-white" to="/">Home</Link>
                            <span className="breadcrumb-item active">Attendant Logs</span>
                            <span className="breadcrumb-info" id="time"></span>
                        </nav>
                    </Col>
                </Row>

                <Row>
                    <Col lg={11} md={11} sm={11} className="mx-auto card bg-dark">
                        <div className="card-header">
                            <Col>
                                <span className="text-light h5">All Attendant Logs</span>
                            </Col>
                        </div>
                        <div className="card-body">
                            <table className="table text-light">
                                <thead>
                                <tr className="text-center text-capitalize">
                                    <th width="5%">SL</th>
                                    <th width="35%">Name</th>
                                    <th width="5%">device</th>
                                    <th width="15%">checkindate</th>
                                    <th width="15%">timein</th>
                                    <th width="10%">timeout</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.attendant_logs.map((item, index) => {
                                        return(
                                            <tr key={item.id}>
                                                <td>{index+1}</td>
                                                <td>{item.attendant_name}</td>
                                                <td>{item.device_uid}</td>
                                                <td>{item.checkindate}</td>
                                                <td>{item.timein}</td>
                                                <td>{item.timeout}</td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default AttendantLogs;