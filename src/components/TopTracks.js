import React from "react";
import PropTypes from "prop-types";

// Components
import TrackList from "./TrackList";
import Info from "./Info";

const TopTracks = ({ tracks, playlist, onClick }) => {
	return(
		<section className="top-tracks component">
			<h2>Favoriter<Info>Dina topplåtar under de senaste veckorna</Info></h2>

			<TrackList tracks={tracks} playlist={playlist} onClick={onClick} />
		</section>
	);
};

TopTracks.propTypes = {
	tracks: PropTypes.array.isRequired,
	playlist: PropTypes.array,
	onClick: PropTypes.func
};

export default TopTracks;
