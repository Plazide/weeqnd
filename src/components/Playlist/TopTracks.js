import React from "react";
import PropTypes from "prop-types";

// Components
import TrackList from "./TrackList";
import Info from "../Info";

const TopTracks = ({ tracks, playlist, onClick, adding }) => {
	return(
		<section className="top-tracks">
			<h2>Your top songs<Info>Your personal most played songs during the past weeks.</Info></h2>

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
