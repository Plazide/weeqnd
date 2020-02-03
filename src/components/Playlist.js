import React from "react";
import PropTypes from "prop-types";

// Components
import Search from "./Search";
import TopTracks from "./TopTracks";

const Playlist = ({ display, topTracks, onClick }) => {
	if(display !== "playlist") return"";

	return(
		<section className="playlist view">
			<div className="content">
				<TopTracks tracks={topTracks} onClick={onClick} />

			</div>

		</section>
	);
};

Playlist.propTypes = {
	display: PropTypes.string,
	topTracks: PropTypes.array,
	onClick: PropTypes.func
};

export default Playlist;
