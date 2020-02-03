import React from "react";
import PropTypes from "prop-types";

// Components
import TrackList from "./TrackList";
import Info from "./Info";

const TopTracks = ({ tracks, onClick }) => {
	return(
		<section className="top-tracks component">
			<h2>Favoriter<Info>Dina topplåtar under de senaste veckorna</Info></h2>

			<TrackList tracks={tracks} onClick={onClick} />
		</section>
	);
};

TopTracks.propTypes = {
	tracks: PropTypes.array.isRequired
};

export default TopTracks;
