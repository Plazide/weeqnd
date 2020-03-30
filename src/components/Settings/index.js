import React, { useEffect, useContext } from "react";

// Components
import Party from "./Party";
import Code from "./Code";
import FallbackPlaylist from "./FallbackPlaylist";
import PlaybackDevice from "./PlaybackDevice";

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
			const[{ items: playlists }, { devices }] = await Promise.all([
				spotify.getUsersPlaylists(),
				spotify.getDevices()
			]);

			setPartyState({ playlists, devices });
		};

		if(party.playlists.length === 0)
			fetchPlaylists();
	});

	return(
		<section className="settings view">
			<div className="content">
				<Code />
				<FallbackPlaylist playlists={party.playlists} selected={party.fallbackPlaylist} />
				<PlaybackDevice devices={party.devices} />
				<Party />
			</div>
		</section>
	);
};

export default Settings;
