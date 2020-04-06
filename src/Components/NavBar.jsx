import React, { Component } from 'react';
import styled from 'styled-components';

import Logo from './Logo';
import Links from './Links';

const Container = styled.div.attrs({
    className: 'container',
})`
    height: 150px;
`

const Nav = styled.nav.attrs({
    className: 'navbar navbar-expand-lg navbar-dark',
})`
    margin-bottom: 20 px;
    background-color: #000;
    border-bottom: 1px solid #fff;
`

class NavBar extends Component {
    render() {
        return (
            <Container>
                <Nav>
                    <Logo />
                    <Links />
                </Nav>
            </Container>
        )
    }
}

export default NavBar;
