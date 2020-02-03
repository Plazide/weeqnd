import React from "react";
import PropTypes from "prop-types";

// Components
import Search from "./Search";
import TopTracks from "./TopTracks";

const Playlist = ({ display, playlist, topTracks, onClick }) => {
	if(display !== "playlist") return"";

	return(
		<section className="playlist view">
			<div className="content">
				<TopTracks tracks={topTracks} playlist={playlist} onClick={onClick} />

			</div>

		</section>
	);
};

Playlist.propTypes = {
	display: PropTypes.string,
	topTracks: PropTypes.array,
	playlist: PropTypes.array,
	onClick: PropTypes.func
};

export default Playlist;
