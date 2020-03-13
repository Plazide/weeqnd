import React from "react";
import PropTypes from "prop-types";

import Radio from "../Radio/";

const PlaylistRadio = ({ name, total, href }) => {
	return(
		<label htmlFor={href}>
			<div className="playlist">
				<span className="name">{name}</span>
				<span className="duration">
					{`${total} låtar`}
				</span>
				<Radio name="playlist" id={href} value={href} />
			</div>
		</label>
	);
};

PlaylistRadio.propTypes = {
	name: PropTypes.string,
	total: PropTypes.number,
	href: PropTypes.string
};

export default PlaylistRadio;
