import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";

// Util
import { getQueryParams } from "../../js/util";
import spotify from "../../js/spotify";

// Layout
import Layout from "../../components/layout";
import SEO from "../../components/seo";

// Icons
import PlaylistIcon from "../../images/icons/playlist-tab.svg";
import SettingsIcon from "../../images/icons/settings.svg";

// Css
import "../../styles/party.css";

const PartyPage = () => {
	const[isOwner, setIsOwner] = useState(false);
	const query = getQueryParams();

	/* async function join (){
		const accessToken = spotify.accessToken;
		const code = window.localStorage.getItem("partyCode");
		const response = await fetch(`/api/join?code=${code}`, {
			method: "GET",
			headers: {
				"x-access-token": accessToken
			}
		});

		const result = await response.json();
		setIsOwner(result.data.isOwner);
	}

	join(); */

	return(
		<Layout>
			<SEO
				title="Fest"
				description="En fest"
			/>
			<>
				{isOwner ? (
					<div className="tabs">
						<button className="tab selected"><PlaylistIcon className="icon" />Spellista</button>
						<button className="tab"><SettingsIcon className="icon" />Inställningar</button>
					</div>
				) : ""
				}

				<div className="content">

				</div>
			</>
		</Layout>
	);
};

export default PartyPage;
