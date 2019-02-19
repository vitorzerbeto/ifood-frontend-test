import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'

import './assets/css/index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import App from './App';
import reducers from './main/reducers'

require('dotenv').config();

window.addEventListener('scroll', function() {
	let doc = document.documentElement;
	let top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

	const els = document.querySelectorAll('.animate:not(.action)');

	els.forEach(el => {
		if(top >= el.offsetTop) el.classList.add('action')
	})
});

window.addEventListener('load', function() {
	document.querySelector('section.animate').classList.add('action')
});

const store = applyMiddleware(thunk, multi, promise)(createStore)(reducers);
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
, document.getElementById('root'));