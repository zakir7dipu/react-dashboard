import React, {Component, Fragment} from 'react';
import {AiFillDashboard} from "@react-icons/all-files/ai/AiFillDashboard";

class LeftBar extends Component {
    render() {
        return (
            <Fragment>
                <div className="navBarLeft bg-dark">
                    <ul className="navBar">
                        <li className="navBarItem theme-btn">
                            <a href="" className="navBarLink">
                                <AiFillDashboard className="navIcon"/>
                                <span className="navText">Dashboard</span>
                            </a>
                        </li>
                        <li className="navBarItem theme-btn">
                            <a href="" className="navBarLink">
                                <AiFillDashboard className="navIcon"/>
                                <span className="navText">item</span>
                            </a>
                        </li>
                        <li className="navBarItem theme-btn has-dropdown">
                            <a href="" className="navBarLink">
                                <AiFillDashboard className="navIcon"/>
                                <span className="navText">item</span>
                            </a>
                            <ul className="dropdown d-none">
                                <li className="dropdownItem theme-btn">
                                    <a href="" className="navBarLink dropdownItemLink">
                                        <AiFillDashboard className="navIcon"/>
                                        <span className="navText">item</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </Fragment>
        );
    }
}

export default LeftBar;