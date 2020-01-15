import React from "react";
import PropTypes from "prop-types";

// Css
import "./styles/info.css";

const Info = ({ children }) => {
	return(
		<div className="info">
			<button className="icon">
				<span>?</span>
			</button>
			<div className="text">{children}</div>
		</div>
	);
};

Info.propTypes = {
	children: PropTypes.node.isRequired
};

export default Info;
