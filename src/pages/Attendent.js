import React, {Component} from 'react';
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {IoIosAddCircleOutline} from "@react-icons/all-files/io/IoIosAddCircleOutline";
import AttendantAdd from "../components/modals/AttendentAdd";
import axios from "axios";

class Attendant extends Component {
    constructor(props) {
        super();
        this.state = {
            attendant: [],
            modalShow:false
        }
    }

    setModalShow = (value) => {
        this.setState({modalShow:value});
        setTimeout(()=>{
            this.getAllAttendants()
        },3000);
    }

    getAllAttendants = () => {
        let session = JSON.parse(window.sessionStorage.getItem('session'))
        axios.get(`/api/attendants`, { headers: {"token" : session.token} })
            .then(response => {
                if (response.data.status === 200){
                    // console.log(response.data.data)
                    this.setState({attendant:response.data.data})
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
        this.getAllAttendants();
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
                                        this.state.attendant.map((item, index) => {
                                            return(
                                                <tr key={item.id}>
                                                    <td>{index+1}</td>
                                                    <td>{item.attendant_sl}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.gender}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.company_id}</td>
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

                <AttendantAdd show={this.state.modalShow}
                           onHide={() => this.setModalShow(false)}/>
            </div>
        );
    }
}

export default Attendant;