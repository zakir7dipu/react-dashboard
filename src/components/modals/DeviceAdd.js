import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import "../../GlobalVariable"

class DeviceAdd extends Component {
    constructor(props) {
        super();
        this.state = {
            company: '',
            device_id: '',
            device_type: '',
            errorMessage: ''
        }
    }
    // componentDidMount() {
    //     console.log(this.props)
    // }

    saveDevice = () => {
        let session = JSON.parse(window.sessionStorage.getItem('session'))
        let data = {
            company: this.state.company,
            device_id: this.state.device_id,
            device_type: this.state.device_type
        }
        axios.post(`/api/device`, data,{ headers: {"token" : session.token} })
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
            device_id: '',
            device_type: '',
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
                        Add Device
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={this.saveDevice}>
                    <Modal.Body>
                        <div className="form-group">
                            <label htmlFor="companyName">Company Name</label>
                            <input className="form-control" type="text" name="company" id="companyName" required={true} onChange={(e)=>{
                                this.setState({company:e.target.value})
                            }} value={this.state.company}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="deviceId">Device ID</label>
                            <input className="form-control" type="tex" name="device_id" id="deviceId" required={true} onChange={(e)=>{
                                this.setState({device_id:e.target.value})
                            }} value={this.state.device_id}/>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="deviceId">Device Type</label>
                            <select className="form-control" name="device_type" id="deviceType" required={true} onChange={(e)=>{
                                this.setState({device_type:e.target.value})
                            }} value={this.state.device_type}>
                                <option value="">Select one</option>
                                <option value="master">Master</option>
                                <option value="service">Service</option>
                            </select>
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

export default DeviceAdd;