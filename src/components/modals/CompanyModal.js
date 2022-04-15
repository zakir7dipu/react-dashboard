import React, {Component} from 'react';
import {Button, Col, Modal} from "react-bootstrap";
import {AiFillStar} from "@react-icons/all-files/ai/AiFillStar";
import axios from "axios";

class CompanyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            phone: "",
            email: "",
            type: "",
            errors: {
                name: "",
                phone: "",
                email: "",
                type: "",
            },
        }
    }

    handelSubmit = (e) => {
        e.preventDefault()
        let {errors} = this.state;
        if (!this.state.name) errors.name = 'Company name is required';
        if (!this.state.phone) errors.phone = 'Company phone is required';
        if (!this.state.email) errors.email = 'Company email is required';
        if (!this.state.type) errors.type = 'Company type is required';
        this.setState({errors:errors})
        if (this.state.errors.length > 0) return;

        let inputs = new FormData();
        inputs.append('name', this.state.name)
        inputs.append('phone', this.state.phone)
        inputs.append('email', this.state.email)
        inputs.append('type', this.state.type)

        if(this.props.company){
            let updateInputs = {
                name: this.state.name,
                phone: this.state.phone,
                email: this.state.email,
                type: this.state.type,
            }
            this.putData(updateInputs)
        }else {
            this.postData(inputs)
        }

    }

    postData = (data) => {
        this.setState({
            name: "",
            phone: "",
            email: "",
            type: "",
        })
        let session = JSON.parse(window.sessionStorage.getItem('session'))
        axios.post('/api/companies', data,{headers: { Authorization: `Bearer ${session.token}` }})
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
        axios.put(`/api/companies/${this.props.company}`, data,{headers: { Authorization: `Bearer ${session.token}` }})
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

    getData = (value) => {
        let session = JSON.parse(window.sessionStorage.getItem('session'))
        axios.get(`/api/companies/${value}`, {headers: {Authorization: `Bearer ${session.token}`}})
            .then(response => {
                this.setState({
                    name: response.data.data.name,
                    phone: response.data.data.phone,
                    email: response.data.data.email,
                    type: response.data.data.type,
                })
            })
            .catch(error => {
                global.toast.fire({
                    icon: 'error',
                    title: error.response.data.message
                })
            })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.company !== this.props.company){
            if (this.props.company) {
                this.getData(this.props.company)
            } else {
                this.setState({
                    name: "",
                    phone: "",
                    email: "",
                    type: "",
                })
            }

        }
    }


    render() {
        return (
            <Modal
                show={this.props.show}
                // size="sm"
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
                        <div className="form-group">
                            <label htmlFor="name">Company Name <AiFillStar className="text-danger"/> <small className="text-danger">{`${this.state.errors.name}`}</small></label>
                            <input type="text" name="name" id="name" className="form-control rounded" onChange={e=>{
                                let {errors} = this.state;
                                errors.name = ''
                                this.setState({name: e.target.value, errors:errors});
                            }} value={this.state.name} placeholder="Company Name"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Company Phone <AiFillStar className="text-danger"/> <small className="text-danger">{`${this.state.errors.phone}`}</small></label>
                            <input type="tel" name="phone" id="phone" className="form-control rounded" onChange={e=>{
                                let {errors} = this.state;
                                errors.phone = ''
                                this.setState({phone: e.target.value, errors:errors})
                            }} value={this.state.phone} placeholder="Company Phone"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Company Email <AiFillStar className="text-danger"/> <small className="text-danger">{`${this.state.errors.email}`}</small></label>
                            <input type="email" name="email" id="email" className="form-control rounded" onChange={e=>{
                                let {errors} = this.state;
                                errors.email = ''
                                this.setState({email: e.target.value, errors:errors})
                            }} value={this.state.email} placeholder="Company Email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="type">Company Type <AiFillStar className="text-danger"/> <small className="text-danger">{`${this.state.errors.type}`}</small></label>
                            <input type="text" name="type" id="type" className="form-control rounded" onChange={e=>{
                                let {errors} = this.state;
                                errors.type = ''
                                this.setState({type: e.target.value, errors:errors})
                            }} value={this.state.type} placeholder="Company Type"/>
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

export default CompanyModal;