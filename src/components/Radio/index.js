import React from "react";
import PropTypes from "prop-types";

// Css
import "./style.css";

const Radio = ({ name, id, value, selected, className = "", onChange = null }) => {
	return(
		<span className={`radio ${className}`}>
			<input
				id={id} type="radio"
				defaultChecked={selected === value}
				name={name}
				value={value}
				onChange={onChange}
			/>
			<span className="custom-radio"></span>
		</span>
	);
};

Radio.propTypes = {
	name: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	selected: PropTypes.string,
	className: PropTypes.string,
	onChange: PropTypes.func
};

export default Radio;
