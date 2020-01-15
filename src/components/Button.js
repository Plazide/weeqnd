import React from "react";
import PropTypes from "prop-types";

// css
import "./styles/buttons.css";

const Button = ({ variant, children }) => (
	<button className={`button ${variant}`}>{children}</button>
);

Button.propTypes = {
	variant: PropTypes.string,
	children: PropTypes.node
};

export default Button;
