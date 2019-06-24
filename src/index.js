import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'semantic-ui-less/semantic.less'
import 'react-toastify/dist/ReactToastify.min.css';

import './index.css'
import { registerServiceWorker } from './serviceWorker'


ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
