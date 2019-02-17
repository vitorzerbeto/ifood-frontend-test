import React from 'react'

export default props => {
	const type = props.config.validation.primitiveType === "INTEGER" ? "number" : "datetime-local";
	const min = props.config.validation.hasOwnProperty('min') ? props.config.validation.min : false;
	const max = props.config.validation.hasOwnProperty('max') ? props.config.validation.max : false;

	const renderWithMinMax = (min, max) => (
		<div key={props.config.id} className="form-group col-xs-12 col-sm-6 col-md-2">
			<input key={props.config.id+'input'} className="form-control"
				   id={props.config.id}
				   name={props.config.id}
				   type={type}
				   placeholder={props.config.name}
				   min={min}
				   max={max}
			/>
		</div>
	);

	const renderNormal = () => (
		<div key={props.config.id} className="form-group col-xs-12 col-sm-6 col-md-2">
			<input key={props.config.id+'input'} className="form-control"
				   id={props.config.id}
				   name={props.config.id}
				   type={type}
				   placeholder={props.config.name}
			/>
		</div>
	);

	if(min !== false && max !== false)
		return renderWithMinMax(min, max);
	return renderNormal();
}

