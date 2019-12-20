import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

// Components
import Logo from "./logo";
import Navigation from "./navigation";

// Css
import "./styles/header.css";

const Header = ({ siteTitle }) => {
	return(
		<header>
			<div className="wrapper">
				<Logo />
				<Navigation />
			</div>
		</header>
	);
};

Header.propTypes = {
	siteTitle: PropTypes.string
};

export default Header;
