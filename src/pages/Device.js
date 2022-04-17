import React, {Component} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import DeviceAdd from "../components/modals/DeviceAdd";
import {IoMdAdd} from "@react-icons/all-files/io/IoMdAdd";
import {RiFileEditLine} from "@react-icons/all-files/ri/RiFileEditLine";
import {BsFillTrashFill} from "@react-icons/all-files/bs/BsFillTrashFill";
import Swal from "sweetalert2";

class Device extends Component {
    constructor(props) {
        super();
        this.state = {
            devices: [],
            modalShow:false,
            modalTitle: 'Register New Device',
            device: ''
        }
    }

    setModalShow = (value) => {
        this.setState({modalShow:value});
    }

    onSave = (value) => {
        let {devices} = this.state;
        devices.push(value);
        this.setState({devices:devices});
        this.setModalShow(false)
    }

    getData = () => {
        let session = JSON.parse(window.sessionStorage.getItem('session'))
        axios.get(`api/devices`, {headers: { Authorization: `Bearer ${session.token}` }})
            .then(response => {
                this.setState({devices: response.data.data})
            })
            .catch(error => {
                global.toast.fire({
                    icon: 'error',
                    title: error.response.data.message
                })
            });
    }

    modeUpdate = (value) => {
        let session = JSON.parse(window.sessionStorage.getItem('session'))
        axios.get(`api/devices/${value}/edit`, {headers: { Authorization: `Bearer ${session.token}` }})
            .then(response => {
               this.getData()
            })
            .catch(error => {
                global.toast.fire({
                    icon: 'error',
                    title: error.response.data.message
                })
            });
    }

    onEdit = (value, name) => {
        this.setState({
            modalTitle: `Edit ${name}`,
            device: value
        })
        this.setModalShow(true)
    }

    onUpdate = (value) => {
        let {devices} = this.state;
        Array.from(devices).map((item, index) => {
            if (item.id === value.id){
                devices[index] = value
            }
        })
        this.setState({devices:devices})
        this.setModalShow(false)
    }

    onDelete = (value, name) => {
        Swal.fire({
            title: 'Are you sure?',
            html:
                `Once you delete ${name} you can\'t recover this.`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'OK',
            denyButtonText: `Don't Delete`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                let session = JSON.parse(window.sessionStorage.getItem('session'))
                axios.delete(`/api/devices/${value}`, {headers: { Authorization: `Bearer ${session.token}` }})
                    .then(response => {
                        global.toast.fire({
                            icon: 'success',
                            title: response.data.message
                        })
                        let {devices} = this.state;
                        Array.from(devices).map((item, index) => {
                            if (item.id === response.data.data.id){
                                devices.splice(index, 1)
                            }
                        })
                        this.setState({devices:devices})
                    })
                    .catch(error => {
                        global.toast.fire({
                            icon: 'error',
                            title: error.response.data.message
                        })
                    });
            } else if (result.isDenied) {
                Swal.fire('Your File is safe.', '', 'info')
            }
        })
    }

    componentDidMount() {
        this.getData();
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
                                    <button type="button" className="btn btn-danger rounded btn-sm float-right" onClick={() => {
                                        this.setState({
                                            modalTitle: 'Register New Device',
                                            device: ''
                                        })
                                        this.setModalShow(true)
                                    }}><IoMdAdd className="text-light" size={20}/></button>
                                </Col>
                            </div>
                            <div className="card-body">
                                <table className="table text-light">
                                    <thead>
                                    <tr className="text-center text-capitalize">
                                        <th width="5%">SL</th>
                                        <th width="25%">Name</th>
                                        <th width="10%">Type</th>
                                        <th width="15%">UID</th>
                                        <th width="15%">Company</th>
                                        <th width="15%">Mode</th>
                                        <th width="15%">Action</th>
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
                                                    <td>{item.uid}</td>
                                                    <td>{item.company_name}</td>
                                                    <td>
                                                        <select className="form-control rounded" value={item.mode?"Attendance":"Enrolment"} onChange={()=>this.modeUpdate(item.id)}>
                                                            <option value="">Select One</option>
                                                            <option value="Attendance">Attendance</option>
                                                            <option value="Enrolment">Enrolment</option>
                                                        </select>
                                                    </td>
                                                    <td className="d-flex justify-content-around">
                                                        <Button className="btn-success btn-sm rounded" onClick={()=>{
                                                            this.onEdit(item.id, item.name)
                                                        }}><RiFileEditLine size={20}/></Button>

                                                        <Button className="btn-danger btn-sm rounded" onClick={()=>{
                                                            this.onDelete(item.id, item.name)
                                                        }}><BsFillTrashFill size={20}/></Button>
                                                    </td>
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
                           onHide={() => this.setModalShow(false)} onSave={value=> this.onSave(value)} modalTitle={this.state.modalTitle} device={this.state.device} onUpdate={value=>this.onUpdate(value)}/>
            </div>
        );
    }
}

export default Device;