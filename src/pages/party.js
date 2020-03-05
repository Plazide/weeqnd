import React from "react";
import { Router } from "@reach/router";

// Pages
import Create from "../views/createParty";
import Join from "../views/joinParty";
import Party from "../views/partyPage";

// Layout
import Playlist from "../components/Playlist";
import Settings from "../components/Settings";

const Page = () => {
	return(
		<Router>
			<Party path="party/:code">
				<Playlist
					path="playlist"
					default
				/>
				<Settings
					path="settings"
				/>
			</Party>

			<Create path="party/create" />
			<Join path="party/join" />
		</Router>
	);
};

export default Page;
