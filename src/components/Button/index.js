import React from "react";
import PropTypes from "prop-types";

// css
import "./style.css";

const Button = ({ variant, children, className = "" }) => (
	<button className={`button ${variant} ${className}`}>{children}</button>
);

Button.propTypes = {
	variant: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string
};

export default Button;
