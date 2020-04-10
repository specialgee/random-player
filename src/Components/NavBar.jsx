import React, { Component } from 'react';
//import styled from 'styled-components';

import Links from './Links';

import { Navbar } from 'react-bootstrap';

// const Container = styled.div.attrs({
//     className: 'admin-container',
// })`
//     height: 150px;
// `

// const Nav = styled.nav.attrs({
//     className: 'navbar navbar-expand-lg navbar-dark',
// })`
//     margin-bottom: 20 px;
//     background-color: #000;
//     border-bottom: 1px solid #fff;
// `

class NavBar extends Component {
    render() {
        return (
            // <Container>
            //     <Nav>
            //         <Links />
            //     </Nav>
            // </Container>

            <Navbar className="admin-container" expand="lg">
            <Navbar.Brand className="ml-4" href="/admin">ADMIN</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Links />                
            </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavBar;
