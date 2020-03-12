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
import Playlist from "../components/Playlist/";
import Settings from "../components/Settings";
import Tabs from "../components/Tabs/";

// Components
import Search from "../components/Search/";
import Loader from "../components/Loader/";
import Status from "../components/Status/";

// Contexts
import { PartyContext, MethodContext, LoadingContext } from "../contexts.js";

// Css

const Party = ( props) => {
	const{ code, "*": tab } = props;

	const[status, setStatus] = useState({ msgCode: "", type: "" });
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

		if(socket === null && state.loaded)
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

	const expireStatus = () => {
		setStatus({ msgCode: "", type: "" });
	};

	const activateParty = () => {
		socket.activateParty();
	};

	const methods = {
		onAddTrack,
		onRemoveTrack,
		expireStatus,
		activateParty
	};

	if(socket !== null){
		// Socket Events
		socket.onError = msgCode => {
			setStatus({ type: "error", msgCode });
			setRemovingTrack("");
		};

		socket.onSuccess = msgCode => {
			setStatus({ type: "success", msgCode });
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

		socket.onTrackUpdated = newTrack => {
			const newParty = { ...state.party, currentTrack: newTrack };
			setState({ party: newParty });
		};

		socket.onPartyActivated = () => {
			const newParty = { ...state.party, activated: true };
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

					<Status type={status.type} msgCode={status.msgCode} onExpire={expireStatus} />
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
