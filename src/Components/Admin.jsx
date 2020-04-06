import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { NavBar } from '../components';
import { VideoList, VideoInsert, VideoUpdate } from '../pages';

import 'bootswatch/dist/darkly/bootstrap.min.css';
import './styles/Admin.css';

function Admin() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <NavBar />
            <Switch>
                <Route path="/admin/videos/list"  component={VideoList} />
                <Route path="/admin/videos/create"  component={VideoInsert} />
                <Route
                    path="/admin/videos/update/:id"
                    
                    component={VideoUpdate}
                />
            </Switch>
        </BrowserRouter>
    )
}

export default Admin;
