import React, { useEffect, useContext } from "react";

// Components
import Party from "./Party";
import Code from "./Code";
import FallbackPlaylist from "./FallbackPlaylist";

// util
import spotify from "../../js/spotify";

// Contexts
import { MethodContext, PartyContext } from "../../contexts";

import "./style.css";

const Settings = () => {
	const{ setPartyState } = useContext(MethodContext);
	const party = useContext(PartyContext);

	useEffect( () => {
		const fetchPlaylists = async () => {
			const[playlistResult] = await Promise.all([spotify.getUsersPlaylists()]);
			const playlists = playlistResult.items;

			setPartyState({ playlists });
		};

		if(party.playlists.length === 0)
			fetchPlaylists();
	});

	return(
		<section className="settings view">
			<div className="content">
				<Code />
				<FallbackPlaylist playlists={party.playlists} selected={party.fallbackPlaylist} />
				<Party />
			</div>
		</section>
	);
};

export default Settings;
