import React, { useState } from "react";

// Util
import spotify from "../js/spotify";

// Layout
import Layout from "../components/layout";
import SEO from "../components/seo";

// Images
import playlistTab from "../images/icons/playlist-tab.svg";
import settingsIcon from "../images/icons/settings.svg";

import "../styles/party.css";

const PartyPage = () => {
	const[isOwner, setIsOwner] = useState(false);

	async function join (){
		const accessToken = spotify.accessToken;
		const code = window.localStorage.getItem("partyCode");
		const response = await fetch(`/api/join?code=${code}`, {
			method: "GET",
			headers: {
				"x-access-token": accessToken
			}
		});

		const result = await response.json();
	}

	join();

	return(
		<Layout>
			<SEO
				title="Fest"
				description="En fest"
			/>
			{isOwner ? (
				<div className="tabs">
					<button className="tab selected">Spellista</button>
					<button className="tab">Inställningar</button>
				</div>
			) : ""
			}

			<div className="content">

			</div>
		</Layout>
	);
};

export default PartyPage;
