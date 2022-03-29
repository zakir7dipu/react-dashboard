import React, {Component, Fragment} from 'react';
import TopBar from "./topBar/TopBar";
import LeftBar from "./leftBar/LeftBar";

class NavBar extends Component {

    constructor(props) {
        super();
    }

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