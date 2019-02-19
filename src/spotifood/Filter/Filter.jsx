import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {loadFilterFields, search, refreshToken, toggleLoading, changePlaylist} from '../actions'
import FilterComponents from './FilterComponents'

class Filter extends Component {
	constructor(props) {
		super(props);
		this.formSubmit = this.formSubmit.bind(this);
		this.doSearch = this.doSearch.bind(this);
		this.keyHandler = this.keyHandler.bind(this);
	}

	componentWillMount() {
		this.props.loadFilterFields();
		this.props.refreshToken();

		setInterval(() => {
			this.updateList(document.getElementById("fFilter").elements)
		}, 30000);
	}

	formSubmit(e) {
		e.preventDefault();
		const els = e.target.elements;

		this.updateList(els);
	}

	updateList(elements) {
		document.getElementById('busca').value = "";

		let q = "";
		for (let i = elements.length >>> 0; i--;) {
			if(elements[i].tagName === 'BUTTON') continue;

			if(elements[i].value !== "") {
				if(q === "") {
					if(elements[i].type !== "datetime-local")
						q = `${elements[i].name}=${elements[i].value}`;
					else
						q = `${elements[i].name}=${elements[i].value}:00`;
				} else {
					if(elements[i].type !== "datetime-local")
						q += `&${elements[i].name}=${elements[i].value}`;
					else
						q += `&${elements[i].name}=${elements[i].value}:00`
				}
			}
		}
		this.props.toggleLoading(true);
		this.props.search(q);
	}

	keyHandler(e) {
		if (e.key === 'Enter') {
			this.doSearch();
		} else if (e.key === 'Escape') {
			this.props.changePlaylist(JSON.parse(localStorage.getItem('playlists')));
		}
	}

	doSearch() {
		const search = document.getElementById('busca').value.trim().toLocaleLowerCase();
		const playlists = JSON.parse(localStorage.getItem('playlists'));

		if (search === "") this.props.changePlaylist(playlists);

		let new_list = playlists.map(p => {
			let n = p.name.toLocaleLowerCase();

			if (n.search(search) >= 0)
				return p;
			return null;
		});

		new_list = new_list.filter(function (el) {
			return el !== null;
		});

		this.props.changePlaylist(new_list);
	}

	render() {
		return (
			<div className="col-lg-12">
				<p className="desc-search"><b>Qual o nome da playlist que está procurando?</b></p>
				<div className="row">
					<div className="form-group col-lg-10">
						<input type="text"
							   className="form-control"
							   id="busca"
							   placeholder="Nome da playlist"
							   onKeyUp={this.keyHandler}
						/>
					</div>
					<div className="form-group col-lg-2">
						<button type="button" className="btn btn-dark btn-block" onClick={this.doSearch}>Pesquisar</button>
					</div>
				</div>
				<div className="row">
					<form id="fFilter" className="col-lg-12" action="#" onSubmit={this.formSubmit}>
						<FilterComponents />
					</form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({playlists: state.spotifood.playlists});
const mapDispatchToProps = dispatch =>
	bindActionCreators({loadFilterFields, search, refreshToken, toggleLoading, changePlaylist}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Filter);