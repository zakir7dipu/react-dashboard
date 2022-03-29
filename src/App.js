import React, {Component, Fragment} from 'react';
import './assets/dist/css/bootstrap.min.css';
import "./assets/css/style.css"
import Preloader from "./components/preloader/index"
import NavBar from "./components/nav/NavBar";
import {HashRouter} from "react-router-dom";
import AppRouter from "./router/AppRouter";
import Footer from "./components/footer";

class App extends Component {
    render() {
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

export default App;