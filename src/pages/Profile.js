import React, {Component} from 'react';
import {Col, Row} from "react-bootstrap";

class Profile extends Component {
    render() {
        return (
            <div className="container-fluid">

                <Row>
                    <Col>
                        <nav
                            className="breadcrumb justify-content-sm-start justify-content-center text-center text-light bg-dark ">
                            <a className="breadcrumb-item text-white" href="#">Home</a>
                            <span className="breadcrumb-item active">Profile</span>
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

export default Profile;