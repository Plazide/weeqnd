import React, { useContext } from "react";
import PropTypes from "prop-types";

// Components
import FAB from "../FAB";
import ActivePlaylist from "./ActivePlaylist";

// Icons
import SearchIcon from "../../images/icons/search-icon.svg";

// Contexts
import { PartyContext } from "../../contexts";

const Playlist = () => {
	const{ code } = useContext(PartyContext);

	return(
		<section className="playlist view">
			<div className="content">
				<ActivePlaylist />
			</div>

			<FAB icon={<SearchIcon />} to={`/party/${code}/search`} />
		</section>
	);
};

Playlist.propTypes = {
	display: PropTypes.string,
	adding: PropTypes.string,
	onAddTrack: PropTypes.func
};

export default Playlist;
