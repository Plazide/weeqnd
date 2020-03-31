import React from "react";
import PropTypes from "prop-types";

// Components
import Info from "../Info/";

export default function SongsLimit({ limit = -1 }){
	console.log(limit);

	return(
		<div className="settings__songsLimit component">
			<h2>Request limit <Info>The maximum amount of songs that a user can have queued at any time. -1 means no limit.</Info></h2>
			<input type="tel" pattern="-?[0-9]" min="-1" max="50" defaultValue={limit} />
		</div>
	);
}

SongsLimit.propTypes = {
	limit: PropTypes.number
};
