import React, {Component} from 'react';
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

class Dashboard extends Component {
    render() {
        return (
            <div className="container-fluid">

                <Row>
                    <Col>
                        <nav
                            className="breadcrumb justify-content-sm-start justify-content-center text-center text-light bg-dark ">
                            <Link className="breadcrumb-item text-white" to="/">Home</Link>
                            <span className="breadcrumb-item active">Dashboard</span>
                            <span className="breadcrumb-info" id="time"></span>
                        </nav>
                    </Col>
                </Row>

                <Row>

                </Row>
            </div>
        );
    }
}

export default Dashboard;