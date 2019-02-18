import React, {Component} from 'react';
import ReactDataGrid from 'react-data-grid';
import {connect} from 'react-redux'
import Cell from './Cell'

const columns = [
	{ key: 'name', name: 'Nome'}];

class List extends Component {

	render() {
		return (
			<ReactDataGrid
				minHeight={650}
				rowHeight={300}
				headerRowHeight={40}
				columns={columns}
				rowGetter={i => this.props.playlists[i]}
				rowRenderer={obj => (<Cell {...obj.row} />)}
				rowsCount={this.props.playlists.length}
			/>
		)
	}
}

const mapStateToProps = state => ({playlists: state.spotifood.playlists});
export default connect(mapStateToProps)(List);