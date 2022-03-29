import React, {Component, Fragment} from 'react';
import {FaStream} from "@react-icons/all-files/fa/FaStream";
import {MdEmail} from "@react-icons/all-files/md/MdEmail";
import {BsThreeDots} from "@react-icons/all-files/bs/BsThreeDots";
import AvatarImage1 from "../../../assets/img/profile/man_1.jpg";
import {IoIosNotifications} from "@react-icons/all-files/io/IoIosNotifications";
import AvatarImage2 from "../../../assets/img/profile/man.jpg";
import {IoMdArrowDropdown} from "@react-icons/all-files/io/IoMdArrowDropdown";
import {FcSettings} from "@react-icons/all-files/fc/FcSettings";
import {BsFillPersonFill} from "@react-icons/all-files/bs/BsFillPersonFill";
import {AiFillLock} from "@react-icons/all-files/ai/AiFillLock";
import {AiOutlinePoweroff} from "@react-icons/all-files/ai/AiOutlinePoweroff";
import "../style.css"
import {Link} from "react-router-dom";

class TopBar extends Component {
    constructor(props) {
        super();
        this.state = {
            messageMenu: false,
            notificationMenu: false,
            profileDropDownMenu: false
        }
    }

    messageMenuAction = (e) => {
        e.preventDefault()
        if (this.state.notificationMenu){
            this.setState({
                notificationMenu:!this.state.notificationMenu,
            })
        } else if (this.state.profileDropDownMenu) {
            this.setState({
                profileDropDownMenu:!this.state.profileDropDownMenu,
            })
        }
        this.setState({
            messageMenu:!this.state.messageMenu,
        })

    }

    notificationMenuAction = (e) => {
        e.preventDefault()
        if (this.state.messageMenu){
            this.setState({
                messageMenu:!this.state.messageMenu,
            })
        } else if (this.state.profileDropDownMenu) {
            this.setState({
                profileDropDownMenu:!this.state.profileDropDownMenu,
            })
        }
        this.setState({
            notificationMenu:!this.state.notificationMenu,
        })
    }

    profileDropDownMenuAction = (e) => {
        e.preventDefault()
        if (this.state.notificationMenu){
            this.setState({
                notificationMenu:!this.state.notificationMenu,
            })
        } else if (this.state.messageMenu) {
            this.setState({
                messageMenu:!this.state.messageMenu,
            })
        }
        this.setState({
            profileDropDownMenu:!this.state.profileDropDownMenu,
        })
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
            <div id="wrapper-header">
                <nav className="navbar navbar-expand navbar-dark navbar-danger bg-dark">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#" data-toggle="class"
                               data-target="#wrapper" toggle-class="toggled" onClick={this.responsiveMenuAction}>
                                <FaStream size={20}/>
                            </a>
                        </li>
                    </ul>

                    <ul className="navbar-nav ml-auto">
                        <li className={`nav-item dropdown ${this.state.messageMenu?'show':''}`}>
                            <a className="nav-link dropdown-toggle no-caret" href="#" onClick={this.messageMenuAction} id="messages"
                               data-toggle="dropdown" aria-expanded="false">
                                <MdEmail size={25}/>
                                <span className="badge badge-md">3</span>
                            </a>
                            <div className={`dropdown-menu ${this.state.messageMenu?'show':''}`}>

                                <div className="dropdown-header py-2">
                                    <h6 className="dropdown-title">message</h6>
                                    <a href="#" className="dropdown-link ml-auto">
                                        <BsThreeDots size={20}/>
                                    </a>
                                </div>

                                <div className="dropdown-block p-0 style-scroll">
                                    <div className="box-message">
                                        <ul className="message-list">
                                            <li className="message-item">
                                                <div className="message-img">
                                                    <img src={AvatarImage1} className=" img-fluid"/>
                                                    <span className="badge badge-state bg-danger"></span>
                                                </div>

                                                <div className="message-content">
                                                    <a href="#" className="message-link">Paul
                                                        Harris </a>
                                                    <span className="badge badge-md badge-info float-right">2</span>
                                                    <p className="message-text">Iungeretur omnis contracta infinita
                                                        potest.</p>
                                                    <span className="message-time">1 mn ago</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </li>

                        <li className={`nav-item dropdown ${this.state.notificationMenu?'show':''}`}>
                            <a className="nav-link dropdown-toggle no-caret" onClick={this.notificationMenuAction} href="#"
                               id="notifications" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <IoIosNotifications size={25}/>
                                <span className="badge badge-md">6</span>
                            </a>
                            <div className={`dropdown-menu ${this.state.notificationMenu?'show':''}`}>
                                <div className="dropdown-header py-2">
                                    <h6 className="dropdown-title">notification</h6>
                                    <a href="#" className="dropdown-link ml-auto">
                                        <BsThreeDots size={20}/>
                                    </a>
                                </div>
                                <div className="dropdown-block p-0 style-scroll">
                                    <div className="box-notification">
                                        <ul className="notification-list">
                                            <li className="notification-item">
                                                <div className="notification-content">
                                                    <a href="#" className="notification-link">file
                                                        uploaded</a>
                                                    <p className="notification-text">more</p>
                                                </div>
                                                <div className="notification-time">1 mn ago</div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className={`nav-item dropdown ${this.state.profileDropDownMenu?'show':''}`}>
                            <a className="nav-link dropdown-toggle no-caret d-flex align-items-center"
                               href="#" onClick={this.profileDropDownMenuAction} id="settings" data-toggle="dropdown" aria-haspopup="true"
                               aria-expanded="false">
                                <img src={AvatarImage2} className="rounded-circle " width="32px"/>
                                <span className="d-sm-inline-block d-none pl-2 pr-1">John Doe</span>
                                <IoMdArrowDropdown/>
                            </a>
                            <div className={`dropdown-menu profileDropDown ${this.state.profileDropDownMenu?'show':''}`}>
                                <a className="dropdown-item" href="#">
                                    <FcSettings size={15}/>
                                    settings</a>
                                <Link className="dropdown-item" to="/profile">
                                    <BsFillPersonFill size={15}/>
                                    Profile</Link>
                                <a className="dropdown-item" href="#">
                                    <AiFillLock size={15}/>
                                    Lock</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">
                                    <AiOutlinePoweroff size={15}/>
                                    Deconnexion</a>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default TopBar;