import React, {Component} from 'react';
import Logo from "../assets/img/logo/large.png"
import "../GlobalVariable"
import axios from "axios";
axios.defaults.baseURL = 'https://attendant.savar121gps.com'

class Login extends Component {

    constructor(prop) {
        super();
        this.state = {
            // baseUrl: 'http://127.0.0.1:8000',
            email: '',
            password: '',
            remember_me: ''
        }
    }

    formOnSubmit = (e) => {
        e.preventDefault()
        let input = {
            email: this.state.email,
            password: this.state.password,
            remember_me: this.state.remember_me
        }
        this.loginAction(input);
        this.setState({
            email: '',
            password: '',
            remember_me: ''
        })
    }

    loginAction = (data) => {
        axios.post(`/api/login`, data)
            .then(response => {
                global.toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully'
                })

                window.sessionStorage.setItem('session', JSON.stringify({
                    name: response.data.name,
                    token: response.data.token,
                    welcome: false,
                }))
                window.location.href= '/'

            })
            .catch(error => {
                this.setState({ errorMessage: error.message });
                console.error('There was an error!', error);
            });
    }

    render() {
        return (
            <div id="wrapper" className="wrapper-left-fixed wrapper-header-fixed bg-dark">
                <div className="d-sm-flex justify-content-sm-center d-block">
                    <div className="card card-dark p-0 my-sm-4 my-0 bg-dark">
                        <div className="box-account">
                            <img className="box-account-logo" src={Logo}/>
                            <h6 className="box-account-title text-light"> Login </h6>
                            <form className="box-account-form" onSubmit={this.formOnSubmit}>
                                <span className="reauth-email"> </span>
                                <input className="form-control bg-dark text-light" type="text" required name="email" onChange={e=>this.setState({email:e.target.value})} placeholder="Email" id="inputEmail" value={this.state.email}/>
                                <input className="form-control bg-dark text-light" type="password" onChange={e=>this.setState({password:e.target.value})} required name="password" placeholder="Password" id="inputPassword"  value={this.state.password}/>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" name="remember_me" className="custom-control-input" onChange={e=>this.setState({remember_me:e.target.value})} id="customCheck1" checked={this.state.remember_me?true:false}/>
                                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                </div>
                                <button className="btn btn-primary btn-lg btn-block btn-wave-light" type="submit">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;