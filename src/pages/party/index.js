import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";

// Util
import spotify from "../../js/spotify";
import Socket from "../../js/socket";
import { splitTrack } from "../../js/util";
import useMergeState from "../../js/useMergeState";

// Layout
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import Playlist from "../../components/Playlist";
import Settings from "../../components/Settings";
import Error from "../../components/Error";
import Success from "../../components/Success";

// Contexts
import { PartyContext, UserContext, MethodContext, LoadingContext } from "../../contexts.js";

// Icons
import PlaylistIcon from "../../images/icons/playlist-tab.svg";
import SettingsIcon from "../../images/icons/settings.svg";

// Css
import "../../styles/party.css";
import Loader from "../../components/Loader";

const socket = new Socket({
	accessToken: spotify.accessToken,
	party: typeof window !== "undefined" ? window.location.hash.substring(1) : null
});

socket.start();

const PartyPage = () => {
	const[tab, setTab] = useState("playlist");
	const[code] = useState(typeof window !== "undefined" ? window.location.hash.substring(1) : null);
	const[error, setError] = useState("");
	const[success, setSuccess] = useState("");
	const[addingTrack, setAddingTrack] = useState("");
	const[removingTrack, setRemovingTrack] = useState("");
	const[state, setState] = useMergeState({ party: {}, topTracks: [], loaded: false });

	useEffect( () => {
		const initParty = async () => {
			try{
				if(!code) navigate("/");

				const partyResponse = await fetch("/api/party/get?code=" + code, {
					headers: {
						"x-access-token": spotify.accessToken
					}
				});

				if(partyResponse.status === 401){
					const status = await spotify.refresh();

					if(!status)
						navigate("/");
				}

				const topTracksRequest = spotify.getTopTracks({ limit: 5, timeRange: "short_term" });
				const partyResult = partyResponse.json();
				const[party, topTracksResult] = await Promise.all([partyResult, topTracksRequest]);

				// Parse items into objects.
				party.playlist = party.playlist.map(splitTrack);

				setState({ party, topTracks: topTracksResult.items, loaded: true });
			}catch(err) {
				throw new Error(err);
			}
		};

		if(!state.loaded)
			initParty();
	});

	// Socket Events
	socket.onError = type => {
		setError(type);
	};

	socket.onSuccess = async type => {
		setSuccess(type);
	};

	socket.onTrackAdded = (trackId, playlist) => {
		setAddingTrack("");
		const newParty = { ...state.party, playlist: playlist.map(splitTrack) };
		setState({ party: newParty });
	};

	socket.onTrackRemoved = (trackId, playlist) => {
		setRemovingTrack("");
		const newParty = { ...state.party, playlist: playlist.map(splitTrack) };
		setState({ party: newParty });
	};

	// Methods exposed to child components
	const onAddTrack = (trackId) => {
		setAddingTrack(trackId);
		socket.addTrack({ trackId });
	};

	const onRemoveTrack = (trackObject) => {
		setRemovingTrack(trackObject.id);
		socket.removeTrack(trackObject);
	};

	const expireError = () => {
		setError("");
	};

	const expireSuccess = () => {
		setSuccess("");
	};

	const methods = {
		onAddTrack,
		onRemoveTrack,
		expireError,
		expireSuccess
	};

	return(
		<PartyContext.Provider value={state.party}>
			<MethodContext.Provider value={methods}>
				<LoadingContext.Provider value={{ adding: addingTrack, removing: removingTrack }}>
					<Layout>
						<SEO
							title="Fest"
							description="En fest"
						/>
						<Loader load={!state.loaded}>
							{state.party.isOwner ? (
								<div className="tabs">
									<button
										onClick={ () => setTab("playlist")}
										className={`tab ${tab === "playlist" ? "selected" : ""}`}>
										<PlaylistIcon className="icon" />
							Spellista
									</button>
									<button
										onClick={ () => setTab("settings")}
										className={`tab ${tab === "settings" ? "selected" : ""}`}>
										<SettingsIcon className="icon" />
							Inställningar
									</button>
								</div>
							) : ""}
							<div className="content">
								<div className="views">
									<Playlist
										topTracks={state.topTracks}
										display={tab}
										adding={addingTrack}
										onAddTrack={onAddTrack}
									/>
									<Settings display={tab} />
								</div>
							</div>
						</Loader>

						<Error type={error} onErrorExpire={expireError} />
						<Success type={success} onSuccessExpire={expireSuccess} />
					</Layout>
				</LoadingContext.Provider>
			</MethodContext.Provider>
		</PartyContext.Provider>
	);
};

export default PartyPage;
