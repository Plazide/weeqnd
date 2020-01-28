import React, { useEffect, useState } from "react";

// Util
import spotify from "../../js/spotify";

// Layout
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import Playlist from "../../components/Playlist";
import Settings from "../../components/Settings";

// Icons
import PlaylistIcon from "../../images/icons/playlist-tab.svg";
import SettingsIcon from "../../images/icons/settings.svg";

// Css
import "../../styles/party.css";

const PartyPage = () => {
	const loc = window ? window.location : null;

	const[isOwner, setIsOwner] = useState(false);
	const[loaded, setLoaded] = useState(false);
	const[tab, setTab] = useState("playlist");
	const code = loc.hash.substring(1);

	useEffect( () => {
		const getParty = async () => {
			const response = await fetch("/api/party/get?code=" + code, {
				headers: {
					"x-access-token": spotify.accessToken
				}
			});

			if(response.status === 401){
				await spotify.refresh();
				loc.reload();
			}

			const result = await response.json();
			setIsOwner(result.isOwner);
			setLoaded(true);
		};

		if(!loaded)
			getParty();
	});

	return(
		<Layout>
			<SEO
				title="Fest"
				description="En fest"
			/>
			<>
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
						<Playlist display={tab} />
						<Settings display={tab} />
					</div>
				</div>
			</>
		</Layout>
	);
};

export default PartyPage;
