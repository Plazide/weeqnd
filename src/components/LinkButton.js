import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

// css
import "./styles/buttons.css";

const LinkButton = ({ to, variant, children }) => (
	<Link to={to} className={`button ${variant}`}>{children}</Link>
);

LinkButton.propTypes = {
	to: PropTypes.string,
	variant: PropTypes.string,
	children: PropTypes.node
};

export default LinkButton;
