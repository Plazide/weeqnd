import PropTypes from "prop-types";
import React from "react";

// Components
import Logo from "../logo";
import Navigation from "../navigation";

// Css
import "./style.css";

const Header = () => {
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
