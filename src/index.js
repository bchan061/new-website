import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import Website from './components/Website';
import * as serviceWorker from './serviceWorker';

//import { render } from 'react-snapshot'

ReactDOM.render(<Website />, document.getElementById('root'));
// render(<Website />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
