import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import axios from 'axios';
axios.defaults.baseURL = '/';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.interceptors.request.use(function (config) {  
    const token = localStorage.getItem('user_id');                                      
    config.headers.Authorization =  token;    
    return config;
});

// axios.defaults.headers.common['Authorization'] = 'Basic '+btoa('username:password');
// axios.defaults.headers.common['Authorization'] = 'Bearer test';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
