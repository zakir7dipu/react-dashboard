import React, {Component, Fragment} from 'react';
import {Switch, Route} from "react-router-dom";
import Dashboard from "../pages/Dashboard"
import Profile from "../pages/Profile"
class AppRouter extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route exact path="/" component={Dashboard}/>
                    <Route exact path="/profile" component={Profile}/>
                </Switch>
            </Fragment>
        );
    }
}

export default AppRouter;