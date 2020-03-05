import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import { Router } from "@reach/router";

// Util
import spotify from "../js/spotify";
import Socket from "../js/socket";
import { splitTrack } from "../js/util";
import useMergeState from "../js/useMergeState";

// Layout
import Layout from "../components/layout";
import SEO from "../components/seo";
import Playlist from "../components/Playlist";
import Settings from "../components/Settings";
import Error from "../components/Error";
import Success from "../components/Success";
import Tabs from "../components/Tabs";

// Components
import Search from "../components/Search";

// Contexts
import { PartyContext, MethodContext, LoadingContext } from "../contexts.js";

// Css
import "../styles/party.css";
import Loader from "../components/Loader";

const Party = ( props) => {
	const{ code, "*": tab } = props;

	const[error, setError] = useState("");
	const[success, setSuccess] = useState("");
	const[addingTrack, setAddingTrack] = useState("");
	const[removingTrack, setRemovingTrack] = useState("");
	const[socket, setSocket] = useState(null);
	const[state, setState] = useMergeState({ party: { }, loaded: false });

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
				party.topTracks = topTracksResult.items;
				party.code = code;

				setState({ party, loaded: true });
			}catch(err) {
				throw new Error(err);
			}
		};

		if(!state.loaded)
			initParty();

		if(socket === null)
			setSocket(new Socket({
				accessToken: spotify.accessToken,
				party: code
			}));

		if(socket !== null && !socket.started)
			socket.start();
	});

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

	if(socket !== null){
		// Socket Events
		socket.onError = type => {
			setError(type);
			setRemovingTrack("");
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
	}

	return(
		<PartyContext.Provider value={state.party}>
			<MethodContext.Provider value={methods}>
				<LoadingContext.Provider value={{ adding: addingTrack, removing: removingTrack }}>
					<SEO
						title={`${state.party.owner}'s party`}
					/>
					<Layout>
						<Loader load={!state.loaded}>
							<Tabs isOwner={state.party.isOwner} tab={tab} />
							<div className="content">
								<div className="views">
									<Router>
										<Playlist path="playlist" default />
										<Settings path="settings" />
										<Search path="search" />
									</Router>
								</div>
							</div>
						</Loader>
					</Layout>

					<Error type={error} onErrorExpire={expireError} />
					<Success type={success} onSuccessExpire={expireSuccess} />
				</LoadingContext.Provider>
			</MethodContext.Provider>
		</PartyContext.Provider>
	);
};

Party.propTypes = {
	code: PropTypes.string,
	"*": PropTypes.string
};

export default Party;
