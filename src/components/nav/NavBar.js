import React, {Component, Fragment} from 'react';
import LeftBar from "./leftBar/LeftBar";
import TopBar from "./topBar/TopBar";
class NavBar extends Component {
    render() {
        return (
            <Fragment>
                <TopBar/>
                <LeftBar/>
            </Fragment>
        );
    }
}

export default NavBar;