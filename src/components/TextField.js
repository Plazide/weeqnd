import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({
	label,
	type = "text",
	variant = "filled",
	helperText = "",
	errorText = ""
}) => {
	const error = errorText ? "error" : "";

	return(
		<div className={`text-area ${variant} ${error}`}>
			<label>{label}</label>
			<input type={type}></input>
			<div className="helper-text">{helperText}</div>
			<div className="error-text" role="alert">{errorText}</div>
		</div>
	);
};

TextField.propTypes = {
	label: PropTypes.string.isRequired,
	type: PropTypes.string,
	variant: PropTypes.string,
	helperText: PropTypes.string,
	errorText: PropTypes.string
};
