import React from 'react';
import './styles/Header.css';
import logo from '../assets/img/Gee.png';

function LogoImage() {
    return (
        <img className="LogoImage" src={logo} alt="logo"></img>
    )
}

function HeaderTitle(props) {
    return (
        <h1 className="HeaderTitle">{props.title}</h1>
    )
}

function Header() {
    return (
        <div className="Header">
            <LogoImage />
            <HeaderTitle title="GEE" />
        </div>
    )
}

export default Header;