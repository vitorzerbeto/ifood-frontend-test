import React from 'react'
import {connect} from 'react-redux'

const Loading = props => (
	<div id="loading" className={props.loading ? "active" : ""}>

	</div>
);

const mapStateToProps = state => ({loading: state.spotifood.loading});
export default connect(mapStateToProps)(Loading);