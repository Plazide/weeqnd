import React from "react";
import PropTypes from "prop-types";

import Radio from "../Radio/";

const PlaylistRadio = ({ name, total, href, cover, selected, onChange = null }) => {
	return(
		<label htmlFor={href}>
			<div className="playlist">
				<img className="cover" src={cover} alt={name} />
				<span className="name">{name}</span>
				<span className="duration">
					{`${total} låtar`}
				</span>
				<Radio
					className="radioSelect"
					name="playlist"
					selected={selected}
					id={href}
					value={href}
					onChange={onChange}
				/>
			</div>
		</label>
	);
};

PlaylistRadio.propTypes = {
	name: PropTypes.string,
	total: PropTypes.number,
	href: PropTypes.string,
	cover: PropTypes.string,
	selected: PropTypes.string,
	onChange: PropTypes.func
};

export default PlaylistRadio;
