import React from "react";
import PropTypes from "prop-types";

import ActivePlaylist from "./ActivePlaylist";
import StatusBar from "../StatusBar/";

const Playlist = () => {
	return(
		<section className="playlist view">
			<StatusBar />
			<div className="content">
				<ActivePlaylist />
			</div>

		</section>
	);
};

Playlist.propTypes = {
	display: PropTypes.string,
	adding: PropTypes.string,
	onAddTrack: PropTypes.func
};

export default Playlist;
