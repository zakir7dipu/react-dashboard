import React, {Component, Fragment} from 'react';
import './assets/dist/css/bootstrap.min.css';
import "./assets/css/style.css"
import Preloader from "./components/preloader/index"
import NavBar from "./components/nav/NavBar";
import {HashRouter} from "react-router-dom";
import AppRouter from "./router/AppRouter";
import Footer from "./components/footer";
import Login from "./pages/Login";
import "./GlobalVariable"

class App extends Component {

    constructor(props) {
        super();
        this.state = {
            isLogIn: false
        }
    }

    componentDidMount() {
        let session = JSON.parse(window.sessionStorage.getItem('session'))
        if (session){
            if (!session.welcome) {
                global.toast.fire({
                    icon: 'success',
                    title: `Welcome ${session.name}`
                })
                window.sessionStorage.setItem('session', JSON.stringify({
                    name: session.name,
                    token: session.token,
                    welcome: true,
                }))
            }
            this.setState({isLogIn:true})
        } else {
            this.setState({isLogIn:false})
        }
        console.log(session)
    }

    render() {
        if(!this.state.isLogIn){
            return (
                <Fragment>
                    <Login/>
                </Fragment>
            )
        }else {
            return (
                <div id="wrapper" className="wrapper-left-fixed wrapper-header-fixed bg-dark">
                    {/*<Preloader/>*/}
                    <HashRouter>
                        <NavBar/>
                        <div id="wrapper-content">
                            <AppRouter/>
                        </div>
                        <Footer/>
                    </HashRouter>
                </div>
            );
        }
    }
}

export default App;