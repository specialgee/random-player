import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let xhttp = new XMLHttpRequest();
let data = {};
xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
       // Typical action to be performed when the document is ready:
       data = JSON.parse(xhttp.responseText);
       ReactDOM.render(<App appData={JSON.stringify(data)}/>, document.getElementById('root'));
    }
};

xhttp.open("GET", `${process.env.PUBLIC_URL}/data.json`, true);
xhttp.send();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
