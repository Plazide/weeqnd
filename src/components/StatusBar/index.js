import React, { useContext } from "react";
import { Link } from "@reach/router";

// Components
import CurrentTrack from "./CurrentTrack";

// Css
import "./style.css";

// Icons
import AddIcon from "../../images/icons/add.svg";

// Contexts
import { PartyContext } from "../../contexts";

const StatusBar = () => {
	const party = useContext(PartyContext);
	const{ currentTrack } = party;

	return(
		<div className="statusBar">
			<CurrentTrack currentTrack={currentTrack} />
			<Link className="statusBar__addSong" to={`/party/${party.code}/search`}>
				<AddIcon className="statusBar__addIcon" />
			</Link>
		</div>
	);
};

export default StatusBar;
