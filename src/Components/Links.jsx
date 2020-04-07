import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { history } from '../helpers';
import { authenticationService } from '../services';


const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends Component {
    
    logout() {
        authenticationService.logout();
        history.push('/login');
    }
  
    render() {
        return (
            <React.Fragment>
                <Link to="/admin" className="navbar-brand">
                    ADMIN
                </Link>
                <Collapse>
                    <List className="mr-auto">
                        <Item>
                            <a href="/" className="nav-link">
                                HOME
                            </a>
                        </Item>
                        <Item>
                            <Link to="/admin/videos/list" className="nav-link">
                                LIST
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/admin/videos/create" className="nav-link">
                                ADD VIDEO
                            </Link>
                        </Item>
                    </List>
                    <List className="navbar-right ml-auto">
                        <Item>
                            <Link to="/login" className="nav-link" onClick={this.logout}>
                                LOGOUT
                            </Link>
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links;
