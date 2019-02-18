import React from 'react'

const figure = {
	maxWidth: "50%",
	margin: '0'
};

const img = {
	maxWidth: "100%",
	display: 'block'
};

export default props => (
	<div className="card">
		<div className="flex">
			<figure style={figure}>
				<img src={props.image} alt={props.name} style={img}/>
			</figure>
			<div className="card-body">
				<h5 className="card-title">{props.name}</h5>
				<p className="card-text">{props.owner}</p>
				<p className="card-text">{props.tracks} musicas</p>
				<a href={props.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-success">Som na caixa <span role="img" aria-label="Som">🔊</span></a>
			</div>
		</div>
	</div>
)

