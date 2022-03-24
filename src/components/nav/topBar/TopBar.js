import React, {Component, Fragment} from 'react';
import {Container, Navbar} from "react-bootstrap";
import '../style.css'
import {AiOutlineMenu} from "@react-icons/all-files/ai/AiOutlineMenu";


class TopBar extends Component {
    render() {
        return (
            <Fragment>
               <Container className="bg-dark navBarTop" fluid>
                   <a href="/"><Navbar.Brand> Dashboard </Navbar.Brand></a>
                   <AiOutlineMenu className="menuToggle theme-btn rounded-2"/>
               </Container>
            </Fragment>
        );
    }
}

export default TopBar;