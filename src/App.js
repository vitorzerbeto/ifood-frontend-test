import React, {Component} from 'react';
import Section from './spotifood/Section/Section'
import Filter from './spotifood/Filter/Filter'
import List from './spotifood/List/List'
import Loading from './spotifood/Loading/Loading'

class App extends Component {
	render() {
		return (
			<div>
				<Section />
				<div className="container-fluid">
					<div className="row">
						<Filter />
					</div>
					<div className="row">
						<List />
					</div>

					<Loading />
				</div>
				<footer>
					<p>Created by <a href="https://github.com/vitorzerbeto" target="_blank" rel="noopener noreferrer">Vitor Zerbeto</a></p>
				</footer>
			</div>
		);
	}
}

export default App;
