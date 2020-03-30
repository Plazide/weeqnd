import React from "react";
import PropTypes from "prop-types";

// Components
import TrackList from "./TrackList";
import Info from "../Info";

const TopTracks = ({ tracks, playlist, onClick, adding }) => {
	return(
		<section className="top-tracks">
			<h2>Favoriter<Info>Dina topplåtar under de senaste veckorna</Info></h2>

			<TrackList tracks={tracks} playlist={playlist} onClick={onClick} adding={adding} />
		</section>
	);
};

TopTracks.propTypes = {
	tracks: PropTypes.array.isRequired,
	playlist: PropTypes.array,
	onClick: PropTypes.func,
	adding: PropTypes.string
};

export default TopTracks;
