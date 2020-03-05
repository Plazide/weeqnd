import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

// css
import "./style.css";

const LinkButton = ({ to, variant, children, external }) => (
	external
		? <a href={to} className={`button ${variant}`}>{children}</a>
		: <Link to={to} className={`button ${variant}`}>{children}</Link>
);

LinkButton.propTypes = {
	to: PropTypes.string,
	variant: PropTypes.string,
	external: PropTypes.bool,
	children: PropTypes.node
};

export default LinkButton;
