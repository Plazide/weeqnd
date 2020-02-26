import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";

// Components
import TrackList from "./TrackList";
import Info from "./Info";

// Util
import spotify from "../js/spotify";

// Contexts
import { PartyContext } from "../contexts.js";

export default function ActivePlaylist(){
	const{ playlist = [] } = useContext(PartyContext);
	const[tracks, setTracks] = useState([]);

	useEffect( () => {
		if(playlist.length === 0 && tracks.length !== 0)
			setTracks([]);

		const fetchTracks = async () => {
			if(playlist.length === 0) return;

			const trackList = playlist.sort( (a, b) => a.timeAdded > b.timeAdded).map( item => item.id);
			const result = await spotify.getTracks(trackList);
			if(result.tracks.length !== tracks.length)
				setTracks(result.tracks);
		};

		fetchTracks();
	});

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
