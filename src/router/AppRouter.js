import React, {Component, Fragment} from 'react';
import {Switch, Route} from "react-router-dom";
import Dashboard from "../pages/Dashboard"
import Profile from "../pages/Profile"
import Login from "../pages/Login";
import Device from "../pages/Device";
import Attendent from "../pages/Attendent";
import Company from "../pages/Company";
class AppRouter extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/" component={Dashboard}/>
                    <Route exact path="/companies" component={Company}/>
                    <Route exact path="/device" component={Device}/>
                    <Route exact path="/profile" component={Profile}/>
                    <Route exact path="/attendents" component={Attendent}/>
                </Switch>
            </Fragment>
        );
    }
}

export default AppRouter;