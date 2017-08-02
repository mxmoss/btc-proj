import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import MyDonors from './Donors.js'

ReactDOM.render(<MyDonors />, document.getElementById('root'));
registerServiceWorker();
