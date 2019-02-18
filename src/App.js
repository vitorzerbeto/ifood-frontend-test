import React, {Component} from 'react';
import Filter from './spotifood/Filter/Filter'
import List from './spotifood/List/List'
import Loading from './spotifood/Loading/Loading'

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

				<Loading />
			</div>
		);
	}
}

export default App;
