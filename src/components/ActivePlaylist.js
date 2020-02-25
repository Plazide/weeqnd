import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Components
import TrackList from "./TrackList";
import Info from "./Info";

// Util
import spotify from "../js/spotify";

export default function ActivePlaylist({ playlist = [] }){
	const[tracks, setTracks] = useState([]);

	useEffect( () => {
		return async () => {
			if(playlist.length === 0) return;

			const trackList = playlist.sort( (a, b) => a.timeAdded > b.timeAdded).map( item => item.id);
			const result = await spotify.getTracks(trackList);
			setTracks(result.tracks);
		};
	}, [playlist]);

	return(
		<>
			<h2>Spellista<Info>Den nuvarande spellistan</Info></h2>
			<TrackList tracks={tracks} playlist={playlist} activePlaylist={true} />
		</>
	);
}

ActivePlaylist.propTypes = {
	playlist: PropTypes.array
};
