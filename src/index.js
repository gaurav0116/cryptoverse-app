import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";     // router dom
import 'antd/dist/antd.css';                // Ant design css
import store from './app/store';            // import redux store
import { Provider } from 'react-redux';     // provider

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
    , document.getElementById('root'));