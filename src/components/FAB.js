import React from "react";
import PropTypes from "prop-types";

// css
import "./styles/fab.css";

export default function FAB ({ icon, onClick }){
	return(
		<button className="fab" onClick={onClick}>
			{icon}
		</button>
	);
}

FAB.propTypes = {
	icon: PropTypes.node,
	onClick: PropTypes.func
};
