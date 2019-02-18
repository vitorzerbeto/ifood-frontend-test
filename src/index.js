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

const store = applyMiddleware(thunk, multi, promise)(createStore)(reducers);
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
, document.getElementById('root'));