import React, {Component, Fragment} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import {IoMdAdd} from "@react-icons/all-files/io/IoMdAdd";
import CompanyModal from "../components/modals/CompanyModal";
import {RiFileEditLine} from "@react-icons/all-files/ri/RiFileEditLine";
import {BsFillTrashFill} from "@react-icons/all-files/bs/BsFillTrashFill";
import Swal from "sweetalert2";

class Company extends Component {
    constructor() {
        super();

        this.state = {
            companies: [],
            modalTitle: 'Register New Company',
            company: ''
        }
    }

    setModalShow = (value) => {
        this.setState({modalShow:value});
        // setTimeout(()=>{
        //     this.getData()
        // },3000);
    }

    getData = () => {
        let session = JSON.parse(window.sessionStorage.getItem('session'))
        axios.get('/api/companies', {headers: { Authorization: `Bearer ${session.token}` }})
            .then(response=>{
                this.setState({companies: response.data.data})
            })
            .catch(error=>{
                global.toast.fire({
                    icon: 'error',
                    title: error.response.data.message
                })
            })
    }

    onSave = (value) => {
        let {companies} = this.state;
        companies.push(value);
        this.setState({companies:companies})
        this.setModalShow(false)
    }

    onEdit = (value, name) => {
        this.setState({
            modalTitle: `Edit ${name}`,
            company: value
        })
        this.setModalShow(true)
    }

    onUpdate = (value) => {
        let {companies} = this.state;
        Array.from(companies).map((item, index) => {
            if (item.id === value.id){
                companies[index] = value
            }
        })
        this.setState({companies:companies})
        this.setModalShow(false)
    }

    onDelete= (value, name) => {
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
                axios.delete(`/api/companies/${value}`, {headers: { Authorization: `Bearer ${session.token}` }})
                    .then(response => {
                        global.toast.fire({
                            icon: 'success',
                            title: response.data.message
                        })
                        let {companies} = this.state;
                        Array.from(companies).map((item, index) => {
                            if (item.id === response.data.data.id){
                                companies.splice(index, 1)
                            }
                        })
                        this.setState({companies:companies})
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
        this.getData()
    }

    render() {
        return (
            <Fragment>
                <div className="container-fluid">

                    <Row>
                        <Col>
                            <nav
                                className="breadcrumb justify-content-sm-start justify-content-center text-center text-light bg-dark ">
                                <Link className="breadcrumb-item text-white" to="/">Home</Link>
                                <span className="breadcrumb-item active">Registered Companies</span>
                                <span className="breadcrumb-info" id="time"></span>
                            </nav>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={11} md={11} sm={11} className="mx-auto card bg-dark">
                            <div className="card-header">
                                <Col>
                                    <span className="text-light h5">Registered Companies</span>
                                    <button type="button" className="btn btn-danger rounded btn-sm float-right" onClick={() => {
                                        this.setState({
                                            modalTitle: 'Register New Company',
                                            company: ''
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
                                        <th width="35%">name</th>
                                        <th width="20%">phone</th>
                                        <th width="20%">email</th>
                                        <th width="10%">type</th>
                                        <th width="10%">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.companies.map((item, index) => {
                                            return(
                                                <tr key={item.id}>
                                                    <td>{index+1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.phone}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.type}</td>
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

                <CompanyModal show={this.state.modalShow}
                              onHide={() => this.setModalShow(false)} modalTitle={this.state.modalTitle} onSave={(value)=>this.onSave(value)} company={this.state.company} onUpdate={(value)=>this.onUpdate(value)}/>
            </Fragment>
        );
    }
}

export default Company;