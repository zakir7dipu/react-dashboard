import React, {Component} from 'react';
import Logo from "../../../assets/img/logo/red.png";
import {AiOutlineClose} from "@react-icons/all-files/ai/AiOutlineClose";
import AvatarImage from "../../../assets/img/profile/man.jpg";
import {BsFillPersonFill} from "@react-icons/all-files/bs/BsFillPersonFill";
import {AiOutlineMail} from "@react-icons/all-files/ai/AiOutlineMail";
import {AiFillLock} from "@react-icons/all-files/ai/AiFillLock";
import {RiDashboardFill} from "@react-icons/all-files/ri/RiDashboardFill";
import {GoArrowSmallRight} from "@react-icons/all-files/go/GoArrowSmallRight";
import {AiFillDatabase} from "@react-icons/all-files/ai/AiFillDatabase";
import {Link} from "react-router-dom";

class LeftBar extends Component {

    constructor(props) {
        super();
    }

    hasDropDownAction = (e) => {
        e.preventDefault()
        let navList = e.target.parentElement;
        let dropDownNavList = navList.querySelector(".dropdown-list");
        if(!navList.classList.contains("open")){
            navList.classList.add("open")
            dropDownNavList.setAttribute("style","display: block;")
        } else {
            navList.classList.remove("open")
            dropDownNavList.removeAttribute("style")
        }
    }

    responsiveMenuAction = (e) => {
        e.preventDefault()
        let wrapper = document.querySelector("#wrapper")
        if (wrapper.classList.contains("toggled")){
            wrapper.classList.remove("toggled");
        }else {
            wrapper.classList.add("toggled");
        }
    }

    render() {
        return (
            <div id="wrapper-left" className={this.props.responsiveMenu?'toggle':''}>
                <div className="sidebar sidebar-dark sidebar-danger bg-dark">
                    <div className="sidebar-header border-fade">
                        <Link to="/" className="sidebar-brand">
                            <img className="sidebar-brand-img" src={Logo}/>
                            <span className="sidebar-brand-text">quantummagazine</span>
                        </Link>

                        <a href="#" className="sidebar-close d-md-none" data-toggle="class"
                           data-target="#wrapper" toggle-class="toggled" onClick={this.responsiveMenuAction}>
                            <AiOutlineClose size={25}/>
                        </a>
                    </div>

                    <div className="sidebar-container style-scroll-dark">
                        <div className="sidebar-profile border-fade">
                            <div className="d-flex align-items-center">
                                <img src={AvatarImage}
                                     className="img-fluid img-thumbnail sidebar-profile-img"/>
                            </div>
                            <div className="sidebar-profile-info">
                                <h6>John Doe</h6>
                                <div className="sidebar-actions">
                                    <Link to="/profile" className="keep">
                                        <BsFillPersonFill size={20}/>
                                    </Link>
                                    <a href="#">
                                        <AiOutlineMail size={20}/>
                                    </a>
                                    <a href="#">
                                        <AiFillLock size={20}/>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <ul className="sidebar-nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">
                                    <RiDashboardFill size={25}/>
                                    <span className="link-text">dashboard</span>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/device" className="nav-link">
                                    <AiFillDatabase size={25}/>
                                    <span className="link-text">Device</span>
                                </Link>
                            </li>

                            {/*<li className={`nav-item has-dropdown`}>*/}
                            {/*    <a href="#" className="nav-link" onClick={this.hasDropDownAction}>*/}
                            {/*        <RiDashboardFill size={25}/>*/}
                            {/*        <span className="link-text">dashboard</span>*/}
                            {/*        <span className="badge badge-md"><GoArrowSmallRight size={15}/></span>*/}
                            {/*    </a>*/}
                            {/*    <ul className={`dropdown-list top`}>*/}
                            {/*        <li>*/}
                            {/*            <a href="#" className="nav-link">*/}
                            {/*                <GoArrowSmallRight size={15}/>*/}
                            {/*                <span className="link-text">light</span>*/}
                            {/*            </a>*/}
                            {/*        </li>*/}

                            {/*        <li>*/}
                            {/*            <a href="#" className="nav-link">*/}
                            {/*                <GoArrowSmallRight size={15}/>*/}
                            {/*                <span className="link-text">dark</span>*/}
                            {/*            </a>*/}
                            {/*        </li>*/}
                            {/*    </ul>*/}
                            {/*</li>*/}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default LeftBar;