import React from "react";
import { Link } from "@reach/router";
import PropTypes from "prop-types";

// css
import "./styles/fab.css";

export default function FAB({ icon, onClick, to }){
	if(typeof to !== "undefined" && to !== null)
		return(
			<Link className="fab" to={to}>
				{icon}
			</Link>
		);

	return(
		<button className="fab" onClick={onClick}>
			{icon}
		</button>
	);
}

FAB.propTypes = {
	icon: PropTypes.node,
	onClick: PropTypes.func,
	to: PropTypes.string
};
