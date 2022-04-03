import React, {Component} from 'react';
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {IoIosAddCircleOutline} from "@react-icons/all-files/io/IoIosAddCircleOutline";
import DeviceAdd from "../components/modals/DeviceAdd";

class Attendent extends Component {
    render() {
        return (
            <div>
                <div className="container-fluid">

                    <Row>
                        <Col>
                            <nav
                                className="breadcrumb justify-content-sm-start justify-content-center text-center text-light bg-dark ">
                                <Link className="breadcrumb-item text-white" to="/">Home</Link>
                                <span className="breadcrumb-item active">Attendent</span>
                                <span className="breadcrumb-info" id="time"></span>
                            </nav>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={10} md={11} sm={11} className="mx-auto card bg-dark">
                            <div className="card-header">
                                <Col>
                                    <span className="text-light h5">All Attendent</span>
                                    <button type="button" className="btn btn-danger rounded btn-sm float-right" onClick={() => this.setModalShow(true)}><IoIosAddCircleOutline size={20}/></button>
                                </Col>
                            </div>
                            <div className="card-body">
                                <table className="table text-light">
                                    <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>gender</th>
                                        <th>Email</th>
                                        <th>Company</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.devices.map((item, index) => {
                                            return(
                                                <tr key={item.id}>
                                                    <td>{index+1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.type}</td>
                                                    <td>{item.dep}</td>
                                                    <td>{item.uid}</td>
                                                    <td>{item.mode?"Attendance":"enrolment"}</td>
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

                <DeviceAdd show={this.state.modalShow}
                           onHide={() => this.setModalShow(false)}/>
            </div>
        );
    }
}

export default Attendent;