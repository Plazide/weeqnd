import React from "react";
import PropTypes from "prop-types";

// css
import "./style.css";

const Button = ({ variant, children, onClick = null, className = "" }) => (
	<button className={`button ${variant} ${className}`} onClick={onClick}>{children}</button>
);

Button.propTypes = {
	variant: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,

	onClick: PropTypes.func
};

export default Button;
