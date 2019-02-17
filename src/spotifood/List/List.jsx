import React, {Component} from 'react';
import ReactDataGrid from 'react-data-grid';
import {connect} from 'react-redux'
import Cell from './Cell'

const columns = [
	{ key: 'image', name: 'Imagem'},
	{ key: 'name', name: 'Nome', sortable: true },
	{ key: 'owner', name: 'Criador', sortable: true },
	{ key: 'tracks', name: 'Total de musicas', sortable: true }];

let rows = [];

class List extends Component {

	constructor (props) {
		super(props);
		this.rowGetter = this.rowGetter.bind(this);
		this.rowRender = this.rowRender.bind(this);
	}

	rowGetter(i) {
		let el = this.props.playlists[i];
		return el;
	}

	rowRender(obj) {
		const { row, idx } = obj;
		return (
			<Cell {...row} />
		)
	}

	render() {
		return (
			<ReactDataGrid
				columns={columns}
				minHeight={650}
				rowGetter={this.rowGetter}
				rowRenderer={this.rowRender}
				rowHeight={200}
				headerRowHeight={50}
				rowsCount={this.props.playlists.length}
			/>
		)
	}
}

const mapStateToProps = state => ({playlists: state.spotifood.playlists});
export default connect(mapStateToProps)(List);