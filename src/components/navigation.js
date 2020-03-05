import React, { useState } from "react";
import { Link } from "gatsby";

// Components
import LinkButton from "./Button/Link";

// Icon
import Hamburger from "../images/icons/hamburger.svg";

const Navigation = () => {
	const[ showNav, setShowNav ] = useState(false);
	const open = showNav ? "open" : "";

	function onShowNav(){
		setShowNav(!showNav);
	}

	return(
		<>
			<button className="hamburger-button" onClick={onShowNav}>
				<Hamburger className={`hamburger ${open}`} />
			</button>

			<nav className={`${open}`}>
				<Link to="/faq/">FRÅGOR & SVAR</Link>
				<Link to="/om-spotifest/">OM SPOTIFEST</Link>

				<LinkButton variant="filled" to="/skapa/">SKAPA EN FEST</LinkButton>

				<div className="divide"></div>
				<div className="legal">
					<Link to="/personuppgifter/">Personuppgifter</Link>
					<Link to="/villkor/">Villkor</Link>
				</div>
			</nav>
		</>

	);
};

export default Navigation;
