import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {loadFilterFields, search, refreshToken, toggleLoading} from '../actions'
import FilterComponents from './FilterComponents'

class Filter extends Component {
	constructor(props) {
		super(props);

		this.formSubmit = this.formSubmit.bind(this);
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

	render() {
		return (
			<div className="col-lg-12">
				<div className="row">
					<div className="form-group col-lg-10">
						<label htmlFor="busca">Qual o nome da playlist que está procurando?</label>
						<input type="text" className="form-control" id="busca" placeholder="Nome da playlist" />
					</div>
					<div className="form-group col-lg-2">
						<label htmlFor="">&nbsp;</label>
						<button type="button" className="btn btn-dark btn-block">Pesquisar</button>
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

const mapStateToProps = state => ({filter: state.spotifood.filter});
const mapDispatchToProps = dispatch => bindActionCreators({loadFilterFields, search, refreshToken, toggleLoading}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Filter);