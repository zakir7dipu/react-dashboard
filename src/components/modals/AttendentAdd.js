import React, {Component} from 'react';
import {Button, Col, Modal} from "react-bootstrap";
import axios from "axios";
import "../../GlobalVariable"

class Attendent extends Component {
    constructor(props) {
        super();
        this.state = {
            company: '',
            attend_id: '',
            name: '',
            gender: '',
            email: ''
        }
    }

    saveAttendant = () => {
        let session = JSON.parse(window.sessionStorage.getItem('session'))
        let data = {
            company: this.state.company,
            attend_id: this.state.attend_id,
            name: this.state.name,
            gender: this.state.gender,
            email: this.state.email
        }
        axios.post(`/api/attendant`, data,{ headers: {"token" : session.token} })
            .then(response=>{
                global.toast.fire({
                    icon: 'success',
                    title: response.data
                })
            })
            .catch(error => {
                this.setState({ errorMessage: error.message });
                console.error('There was an error!', error);
            });
        this.setState({
            company: '',
            attend_id: '',
            name: '',
            gender: '',
            email: ''
        })
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
                        Add Attendant
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={this.saveAttendant}>
                    <Modal.Body>
                        <div className="form-row">
                            <Col lg={6} md={6} sm={12}>
                                <div className="form-group">
                                    <label htmlFor="companyName">Company Name</label>
                                    <input className="form-control" type="text" name="company" id="companyName" required={true} onChange={(e)=>{
                                        this.setState({company:e.target.value})
                                    }} value={this.state.company}/>
                                </div>
                            </Col>

                            <Col lg={6} md={6} sm={12}>
                                <div className="form-group">
                                    <label htmlFor="attendId">Attendant ID</label>
                                    <input className="form-control" type="text" name="attend_id" id="attendId" required={true} onChange={(e)=>{
                                        this.setState({attend_id:e.target.value})
                                    }} value={this.state.attend_id}/>
                                </div>
                            </Col>
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Attendant Name</label>
                            <input className="form-control" type="tex" name="name" id="deviceId" required={true} onChange={(e)=>{
                                this.setState({name:e.target.value})
                            }} value={this.state.name}/>
                        </div>

                        <div className="form-row">
                            <Col lg={6} md={6} sm={12}>
                                <div className="form-group">
                                    <label htmlFor="gender">Attendant Gender</label>
                                    <input className="form-control" type="text" name="gender" id="gender" required={true} onChange={(e)=>{
                                        this.setState({gender:e.target.value})
                                    }} value={this.state.gender}/>
                                </div>
                            </Col>

                            <Col lg={6} md={6} sm={12}>
                                <div className="form-group">
                                    <label htmlFor="email">Attendant Email</label>
                                    <input className="form-control" type="text" name="email" id="email" required={true} onChange={(e)=>{
                                        this.setState({email:e.target.value})
                                    }} value={this.state.email}/>
                                </div>
                            </Col>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" className="btn-danger" onClick={this.props.onHide}>Save</Button>
                        <Button onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

export default Attendent;