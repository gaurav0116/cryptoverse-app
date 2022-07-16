import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";     // router
import 'antd/dist/antd.css';                // Ant design css
import store from './app/store';            // redux store
import { Provider } from 'react-redux';     // provider for provide store to App

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
    , document.getElementById('root'));