import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
//import styled from 'styled-components';
//import { history } from '../helpers';
import { authenticationService } from '../services';
import { Nav, Button } from 'react-bootstrap';


// const Collapse = styled.div.attrs({
//     className: 'navbar-collapse',
// })``

// const List = styled.div.attrs({
//     className: 'navbar-nav',
// })``

// const Item = styled.div.attrs({
//     className: 'navbar-collapse',
// })``

class Links extends Component {
    
    logout() {
        authenticationService.logout();
        //history.push('/login');
    }
  
    render() {
        return (
            // <React.Fragment>
            //     <Link to="/admin" className="navbar-brand">
            //         ADMIN
            //     </Link>
            //     <Collapse>
            //         <List  id="collapseExample" className="mr-auto">
            //             <Item>
            //                 <a href="/" className="nav-link">
            //                     HOME
            //                 </a>
            //             </Item>
            //             <Item>
            //                 <Link to="/admin/videos/list" className="nav-link">
            //                     LIST
            //                 </Link>
            //             </Item>
            //             <Item>
            //                 <Link to="/admin/videos/create" className="nav-link">
            //                     ADD VIDEO
            //                 </Link>
            //             </Item>
            //         </List>
            //         <List className="navbar-right ml-auto">
            //             <Item>
            //                 <Link to="/login" className="nav-link" onClick={this.logout}>
            //                     LOGOUT
            //                 </Link>
            //             </Item>
            //         </List>
            //     </Collapse>
            // </React.Fragment>

            <React.Fragment>
                <Nav className="mr-auto">
                <Nav.Link className="nav-link" href="/">HOME</Nav.Link>
                <Nav.Link className="nav-link" href="/admin/videos/list">LIST</Nav.Link>
                <Nav.Link className="nav-link" href="/admin/videos/create">ADD VIDEO</Nav.Link>
                </Nav>
                <Button className="nav-link mr-sm-2 pr-4" onClick={this.logout}>LOGOUT</Button>
            </React.Fragment>
        )
    }
}

export default Links;
