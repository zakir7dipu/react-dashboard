import React, {Component} from 'react';
import {Button, Col, Modal} from "react-bootstrap";
import axios from "axios";
import "../../GlobalVariable"
import {AiFillStar} from "@react-icons/all-files/ai/AiFillStar";

class Attendent extends Component {
    constructor(props) {
        super();
        this.state = {
            companies: [],
            name: '',
            company: '',
            attendant_sl: '',
            gender: '',
            email: '',
            fingerprint_id: '',
            errors: {
                name: '',
                company: '',
                attendant_sl: '',
                gender: '',
                email: '',
                fingerprint_id: '',
            }
        }
    }

    handelSubmit = (e) => {
        e.preventDefault()
        let {errors} = this.state;
        if (!this.state.name) errors.name = 'Name is required';
        if (!this.state.company) errors.company = 'Company is required';
        if (!this.state.attendant_sl) errors.attendant_sl = 'Attendant Id is required';
        if (!this.state.gender) errors.gender = 'Gender is required';
        if (!this.state.email) errors.email = 'Attendant email is required';
        if (!this.state.fingerprint_id) errors.fingerprint_id = 'Fingerprint ID is required';
        this.setState({errors:errors})
        if (!this.state.name || !this.state.company || !this.state.attendant_sl || !this.state.gender || !this.state.email || !this.state.fingerprint_id) return;

        let inputs = new FormData();
        inputs.append('name', this.state.name)
        inputs.append('company', this.state.company)
        inputs.append('attendant_sl', this.state.attendant_sl)
        inputs.append('gender', this.state.gender)
        inputs.append('email', this.state.email)
        inputs.append('fingerprint_id', this.state.fingerprint_id)

        if(this.props.attendant){
            let updateInputs = {
                name: this.state.name,
                company: this.state.company,
                attendant_sl: this.state.attendant_sl,
                gender: this.state.gender,
                email: this.state.email,
                fingerprint_id: this.state.fingerprint_id,
            }
            this.putData(updateInputs)
        }else {
            this.postData(inputs)
        }

    }

    postData = (data) => {
        this.setState({
            company: "",
            device_id: "",
            device_type: "",
        })
        let session = JSON.parse(window.sessionStorage.getItem('session'))
        axios.post('/api/attendants', data,{headers: { Authorization: `Bearer ${session.token}` }})
            .then(response=>{
                global.toast.fire({
                    icon: 'success',
                    title: response.data.message
                })
                this.props.onSave(response.data.data)
            })
            .catch(error=>{
                global.toast.fire({
                    icon: 'error',
                    title: error.response.data.message
                })
            })
    }

    putData = (data) => {
        let session = JSON.parse(window.sessionStorage.getItem('session'))
        axios.put(`/api/attendants/${this.props.attendant}`, data,{headers: { Authorization: `Bearer ${session.token}` }})
            .then(response=>{
                global.toast.fire({
                    icon: 'success',
                    title: response.data.message
                })
                this.props.onUpdate(response.data.data)
            })
            .catch(error=>{
                global.toast.fire({
                    icon: 'error',
                    title: error.response.data.message
                })
            })
    }

    getData = () => {
        let session = JSON.parse(window.sessionStorage.getItem('session'))
        axios.get(`api/devices/create`, {headers: { Authorization: `Bearer ${session.token}` }})
            .then(response => {
                this.setState({companies: response.data.data})
            })
            .catch(error => {
                global.toast.fire({
                    icon: 'error',
                    title: error.response.data.message
                })
            });
    }

    showData = (value) => {
        let session = JSON.parse(window.sessionStorage.getItem('session'))
        axios.get(`api/attendants/${value}`, {headers: {Authorization: `Bearer ${session.token}`}})
            .then(response => {
                this.setState({
                    name: response.data.data.name,
                    company: response.data.data.company_id,
                    attendant_sl: response.data.data.attendant_sl,
                    gender: response.data.data.gender,
                    email: response.data.data.email,
                    fingerprint_id: response.data.data.fingerprint_id,
                })
            })
            .catch(error => {
                global.toast.fire({
                    icon: 'error',
                    title: error.response.data.message
                })
            })
    }

    componentDidMount() {
        this.getData()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.attendant !== this.props.attendant){
            if (this.props.attendant){
                this.showData(this.props.attendant)
            } else {
                this.setState({
                    name: '',
                    company: '',
                    attendant_sl: '',
                    gender: '',
                    email: '',
                    fingerprint_id: '',
                })
            }
        }
    }

    render() {
        return (
            <Modal
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.modalTitle}
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={this.handelSubmit}>
                    <Modal.Body>
                        <div className="form-row">
                            <Col lg={6} md={6} sm={12}>
                                <label htmlFor="attendant_sl">Attendant ID <AiFillStar className="text-danger"/> <small className="text-danger">{`${this.state.errors.attendant_sl}`}</small></label>
                                <input className="form-control" type="tex" name="attendant_sl" id="attendant_sl" placeholder="Attendant ID" onChange={(e)=>{
                                    let {errors} = this.state;
                                    errors.attendant_sl = '';
                                    this.setState({attendant_sl:e.target.value, errors:errors})
                                }} value={this.state.attendant_sl}/>
                            </Col>

                            <Col lg={6} md={6} sm={12}>
                                <div className="form-group">
                                    <label htmlFor="companyName">Company Name <AiFillStar className="text-danger"/> <small className="text-danger">{`${this.state.errors.company}`}</small></label>
                                    <select name="companyName" id="companyName" className="form-control rounded" onChange={e=>{
                                        let {errors} = this.state;
                                        errors.company = '';
                                        this.setState({company:e.target.value, errors:errors})
                                    }} value={this.state.company}>
                                        <option value="">Select One Company</option>
                                        {
                                            this.state.companies.map(item=>{
                                                return(
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>

                                </div>
                            </Col>

                            <Col lg={8} md={6} sm={12}>
                                <div className="form-group">
                                    <label htmlFor="name">Name <AiFillStar className="text-danger"/> <small className="text-danger">{`${this.state.errors.name}`}</small></label>
                                    <input className="form-control" type="text" name="name" id="name" placeholder="Attendant Name" onChange={(e)=>{
                                        let {errors} = this.state;
                                        errors.name = '';
                                        this.setState({name:e.target.value, errors:errors})
                                    }} value={this.state.name}/>
                                </div>
                            </Col>

                            <Col lg={4} md={6} sm={12}>
                                <div className="form-group">
                                    <label htmlFor="gender">Gender <AiFillStar className="text-danger"/> <small className="text-danger">{`${this.state.errors.gender}`}</small></label>
                                    <select className="form-control rounded" name="gender" id="gender" onChange={(e)=>{
                                        let {errors} = this.state;
                                        errors.gender = '';
                                        this.setState({gender:e.target.value, errors:errors})
                                    }} value={this.state.gender}>
                                        <option value="">Select One</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="others">Others</option>
                                    </select>
                                </div>
                            </Col>

                            <Col lg={6} md={6} sm={12}>
                                <div className="form-group">
                                    <label htmlFor="email">Attendant Email <AiFillStar className="text-danger"/> <small className="text-danger">{`${this.state.errors.email}`}</small></label>
                                    <input className="form-control rounded" type="email" name="email" id="email" placeholder="Attendant Email" onChange={(e)=>{
                                        let {errors} = this.state;
                                        errors.email = '';
                                        this.setState({email:e.target.value, errors:errors})
                                    }} value={this.state.email}/>
                                </div>
                            </Col>

                            <Col lg={6} md={6} sm={12}>
                                <div className="form-group">
                                    <label htmlFor="fingerprint_id">Fingerprint ID <AiFillStar className="text-danger"/> <small className="text-danger">{`${this.state.errors.fingerprint_id}`}</small></label>
                                    <input className="form-control rounded" type="number" name="fingerprint_id" id="fingerprint_id" placeholder="Fingerprint ID" onChange={(e)=>{
                                        let {errors} = this.state;
                                        errors.fingerprint_id = '';
                                        this.setState({fingerprint_id:e.target.value, errors:errors})
                                    }} value={this.state.fingerprint_id}/>
                                </div>
                            </Col>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" className="btn-danger">Save</Button>
                        <Button onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

export default Attendent;