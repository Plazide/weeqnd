import React from "react";
import { Link } from "@reach/router";

// Icons
import PlaylistIcon from "../../images/icons/playlist-tab.svg";
import SettingsIcon from "../../images/icons/settings.svg";

// Css
import "./style.css";

const Tabs = ({ isOwner, tab }) => {
	if(isOwner)
		return(
			<div className="tabs">
				<Link
					className={`tab ${tab === "playlist" || tab === "" ? "selected" : ""}`}
					to="playlist"
				>
					<PlaylistIcon className="icon" />
					Spellista
				</Link>
				<Link
					className={`tab ${tab === "settings" ? "selected" : ""}`}
					to="settings"
				>
					<SettingsIcon className="icon" />
					Inställningar
				</Link>
			</div>
		);

	return"";
};

export default Tabs;
