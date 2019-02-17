import React from 'react'

export default props => (
	<div className="card">
		<div className="row">
			<figure>
				<img src={props.image} alt={props.name}/>
			</figure>
			<div className="card-body">
				<h5 className="card-title">{props.name}</h5>
				<p className="card-text">{props.owner}</p>
				<p className="card-text">{props.tracks}</p>
			</div>
		</div>
	</div>
)

