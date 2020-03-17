import React from "react";
import PropTypes from "prop-types";

import Radio from "../Radio/";

const PlaylistRadio = ({ name, total, href, cover, selected }) => {
	return(
		<label htmlFor={href}>
			<div className="playlist">
				<img className="cover" src={cover} alt={name} />
				<span className="name">{name}</span>
				<span className="duration">
					{`${total} låtar`}
				</span>
				<Radio className="radioSelect" name="playlist" selected={selected} id={href} value={href} />
			</div>
		</label>
	);
};

PlaylistRadio.propTypes = {
	name: PropTypes.string,
	total: PropTypes.number,
	href: PropTypes.string,
	cover: PropTypes.string,
	selected: PropTypes.string
};

export default PlaylistRadio;
