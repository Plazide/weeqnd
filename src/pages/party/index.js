import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";

// Util
import spotify from "../../js/spotify";
import Socket from "../../js/socket";

// Layout
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import Playlist from "../../components/Playlist";
import Settings from "../../components/Settings";
import Error from "../../components/Error";
import Success from "../../components/Success";

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
	const[isOwner, setIsOwner] = useState(false);
	const[loaded, setLoaded] = useState(false);
	const[tab, setTab] = useState("playlist");
	const[topTracks, setTopTracks] = useState([]);
	const[code] = useState(typeof window !== "undefined" ? window.location.hash.substring(1) : null);
	const[error, setError] = useState("");
	const[success, setSuccess] = useState("");

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
					await spotify.refresh();

					if(typeof window !== "undefined")
						window.location.reload();
				}

				const topTracksRequest = spotify.getTopTracks({ limit: 5, timeRange: "short_term" });
				const partyResult = partyResponse.json();
				const[party, topTracksResult] = await Promise.all([partyResult, topTracksRequest]);

				setIsOwner(party.isOwner);
				setTopTracks(topTracksResult.items);
				setLoaded(true);
			}catch(err) {
				throw new Error(err);
			}
		};

		if(!loaded)
			initParty();
	});

	socket.onError = type => {
		setError(type);
	};

	socket.onSuccess = type => {
		setSuccess(type);
	};

	const onAddTrack = (trackId) => {
		socket.addTrack({ trackId });
	};

	const expireError = () => {
		setError("");
	};

	const expireSuccess = () => {
		setSuccess("");
	};

	return(
		<Layout>
			<SEO
				title="Fest"
				description="En fest"
			/>
			<Loader load={!loaded}>
				{isOwner ? (
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
						<Playlist topTracks={topTracks} display={tab} onClick={onAddTrack} />
						<Settings display={tab} />
					</div>
				</div>
			</Loader>

			<Error type={error} onErrorExpire={expireError} />
			<Success type={success} onSuccessExpire={expireSuccess} />
		</Layout>
	);
};

export default PartyPage;
