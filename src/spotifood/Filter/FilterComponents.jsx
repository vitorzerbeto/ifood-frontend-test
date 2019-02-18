import React from 'react'
import {connect} from 'react-redux'

import Select from './FilterSelect'
import Input from './FilterInput'

const FilterComponents = props => {

	return (
		<div className="row">
			{props.filter.map((el, k) => {
			if(el.hasOwnProperty('values'))
				return (<Select key={'select'+k} config={el} />);
			return (<Input key={'input'+k} config={el} />)
			})}
			<div className="form-group col-xs-12 col-sm-6 col-md-2">
				<button type="submit" className="btn btn-dark btn-block">Filtrar</button>
			</div>
		</div>
	);

};

const mapStateToProps = state => ({filter: state.spotifood.filter});
export default connect(mapStateToProps)(FilterComponents);