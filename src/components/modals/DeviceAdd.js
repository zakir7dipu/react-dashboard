import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import "../../GlobalVariable"
import {AiFillStar} from "@react-icons/all-files/ai/AiFillStar";

class DeviceAdd extends Component {
    constructor(props) {
        super();
        this.state = {
            companies: [],
            company: '',
            device_id: '',
            device_type: '',
            errors: {
                company: '',
                device_id: '',
                device_type: '',
            }
        }
    }

    handelSubmit = (e) => {
        e.preventDefault()
        let {errors} = this.state;
        if (!this.state.company) errors.company = 'Company is required';
        if (!this.state.device_id) errors.device_id = 'Device Id is required';
        if (!this.state.device_type) errors.device_type = 'Device Type is required';
        this.setState({errors:errors})
        if (!this.state.company || !this.state.device_id || !this.state.device_type) return;

        let inputs = new FormData();
        inputs.append('company', this.state.company)
        inputs.append('device_id', this.state.device_id)
        inputs.append('device_type', this.state.device_type)

        if(this.props.device){
            let updateInputs = {
                company: this.state.company,
                device_id: this.state.device_id,
                device_type: this.state.device_type,
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
        axios.post('/api/devices', data,{headers: { Authorization: `Bearer ${session.token}` }})
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
        axios.put(`/api/devices/${this.props.device}`, data,{headers: { Authorization: `Bearer ${session.token}` }})
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
        axios.get(`api/devices/${value}`, {headers: {Authorization: `Bearer ${session.token}`}})
            .then(response => {
                this.setState({
                    company: response.data.data.company_id,
                    device_id: response.data.data.uid,
                    device_type: response.data.data.type,
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
        if (prevProps.device !== this.props.device){
            if (this.props.device){
                this.showData(this.props.device)
            } else {
                this.setState({
                    company: '',
                    device_id: '',
                    device_type: '',
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

                        <div className="form-group">
                            <label htmlFor="deviceId">Device ID <AiFillStar className="text-danger"/> <small className="text-danger">{`${this.state.errors.device_id}`}</small></label>
                            <input className="form-control" type="tex" name="device_id" id="deviceId" onChange={(e)=>{
                                let {errors} = this.state;
                                errors.device_id = '';
                                this.setState({device_id:e.target.value,errors:errors})
                            }} value={this.state.device_id}/>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="deviceId">Device Type <AiFillStar className="text-danger"/> <small className="text-danger">{`${this.state.errors.device_type}`}</small></label>
                            <select className="form-control" name="device_type" id="deviceType" onChange={(e)=>{
                                let {errors} = this.state;
                                errors.device_type = '';
                                this.setState({device_type:e.target.value, errors:errors})
                            }} value={this.state.device_type}>
                                <option value="">Select one</option>
                                <option value="master">Master</option>
                                <option value="service">Service</option>
                            </select>
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

export default DeviceAdd;