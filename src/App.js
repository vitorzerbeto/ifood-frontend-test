import React, {Component} from 'react';
import './App.css';
import Filter from './spotifood/Filter/Filter'
import List from './spotifood/List/List'

class App extends Component {
	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<Filter />
				</div>
				<div className="row">
					<List />
				</div>
			</div>
		);
	}
}

export default App;
