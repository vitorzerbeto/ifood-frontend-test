import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {loadFilterFields, search, refreshToken} from '../actions'
import FilterComponents from './FilterComponents'

class Filter extends Component {
	componentWillMount() {
		this.props.loadFilterFields();
		this.props.refreshToken();
		this.formSubmit = this.formSubmit.bind(this);
	}

	formSubmit(e) {
		e.preventDefault();
		const els = e.target.elements;
		let q = "";
		for (let i = els.length >>> 0; i--;) {
			if(els[i].tagName === 'BUTTON') continue;

			if(els[i].value !== "") {
				if(q === "") {
					if(els[i].type !== "datetime-local")
						q = `${els[i].name}=${els[i].value}`;
					else
						q = `${els[i].name}=${els[i].value}:00`;
				} else {
					if(els[i].type !== "datetime-local")
						q += `&${els[i].name}=${els[i].value}`;
					else
						q += `&${els[i].name}=${els[i].value}:00`
				}
			}
		}
		this.props.search(q);
	}

	render() {
		return (
			<form className="col-lg-12" action="#" onSubmit={this.formSubmit}>
				<div className="row">
				</div>

				<FilterComponents />
			</form>
		)
	}
}

const mapStateToProps = state => ({filter: state.spotifood.filter});
const mapDispatchToProps = dispatch => bindActionCreators({loadFilterFields, search, refreshToken}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Filter);