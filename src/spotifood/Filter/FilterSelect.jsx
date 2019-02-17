import React from 'react'

export default props => (
	<div key={props.config.id}  className="form-group col-xs-12 col-sm-6 col-md-2">
		<select key={props.config.id+'select'} className="custom-select" name={props.config.id} id={props.config.id}>
			<option value="">{props.config.name}</option>
			{
				props.config.values.map(val => (
					<option key={val.value} value={val.value}>{val.name}</option>
				))
			}
		</select>
	</div>
)