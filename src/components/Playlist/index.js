import React, { useContext } from "react";

// Components
import ActivePlaylist from "./ActivePlaylist";
import StatusBar from "../StatusBar/";
import ActiveStatus from "../ActiveStatus/";

// Contexts
import { PartyContext, MethodContext } from "../../contexts";

const Playlist = () => {
	const{ active, isOwner } = useContext(PartyContext);
	const{ activateParty } = useContext(MethodContext);

	return(
		<section className="playlist view">
			{active ? (
				<>
					<div className="content">
						<ActivePlaylist />
					</div>
					<StatusBar />
				</>
			) : (
				<div className="content">
					<ActiveStatus isOwner={isOwner} onActivate={activateParty} />
				</div>
			)}

		</section>
	);
};

export default Playlist;
