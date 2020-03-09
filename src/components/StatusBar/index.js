import React, { useContext } from "react";
import { Link } from "@reach/router";

// Css
import "./style.css";

// Icons
import AddIcon from "../../images/icons/add.svg";

// Contexts
import { PartyContext } from "../../contexts";

const StatusBar = () => {
	const party = useContext(PartyContext);

	return(
		<div className="statusBar">
			<div className="statusBar__currentSong">

			</div>
			<Link className="statusBar__addSong" to={`/party/${party.code}/search`}>
				<AddIcon className="statusBar__addIcon" />
			</Link>
		</div>
	);
};

export default StatusBar;
