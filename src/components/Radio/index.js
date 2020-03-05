import React from "react";
import PropTypes from "prop-types";

// Css
import "./style.css";

const Radio = ({ name, id, value }) => (
	<span className="radio">
		<input id={id} type="radio" name={name} value={value} />
		<span className="custom-radio"></span>
	</span>
);

Radio.propTypes = {
	name: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired
};

export default Radio;
