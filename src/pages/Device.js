import React, {Component} from 'react';
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import {IoIosAddCircleOutline} from "@react-icons/all-files/io/IoIosAddCircleOutline";
import DeviceAdd from "../components/modals/DeviceAdd";

class Device extends Component {
    constructor(props) {
        super();
        this.state = {
            devices: [],
            modalShow:false
        }
    }

    getAllDevice = () => {
        let session = JSON.parse(window.sessionStorage.getItem('session'))
        axios.get(`/api/device`, { headers: {"token" : session.token} })
            .then(response => {
                if (response.data.status === 200){
                    // console.log(response.data.data)
                    this.setState({devices:response.data.data})
                } else if (response.data.status === 2) {
                    // console.log(response.data)
                }
            })
            .catch(error => {
                this.setState({ errorMessage: error.message });
                console.error('There was an error!', error);
            });
    }

    componentDidMount() {
        this.getAllDevice();
    }

    setModalShow = (value) => {
        // console.log(value)
        this.setState({modalShow:value})
    }

    render() {
        return (
            <div>
                <div className="container-fluid">

                    <Row>
                        <Col>
                            <nav
                                className="breadcrumb justify-content-sm-start justify-content-center text-center text-light bg-dark ">
                                <Link className="breadcrumb-item text-white" to="/">Home</Link>
                                <span className="breadcrumb-item active">Device</span>
                                <span className="breadcrumb-info" id="time"></span>
                            </nav>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={10} md={11} sm={11} className="mx-auto card bg-dark">
                            <div className="card-header">
                                <Col>
                                    <span className="text-light h5">All Devices</span>
                                    <button type="button" className="btn btn-danger rounded btn-sm float-right" onClick={() => this.setModalShow(true)}><IoIosAddCircleOutline/></button>
                                </Col>
                            </div>
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th>Name</th>
                                        <th>UID</th>
                                        <th>Company</th>
                                        <th>Mode</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.devices.map((item, index) => {
                                            return(
                                                <tr key={item.id}>
                                                    <td>{index+1}</td>
                                                    <td>{item.name}</td>
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

export default Device;