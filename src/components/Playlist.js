import React, { useState, useContext } from "react";
import PropTypes from "prop-types";

// Components
import Search from "./Search";
import TopTracks from "./TopTracks";
import FAB from "./FAB";
import ActivePlaylist from "./ActivePlaylist";

// Contexts
import { PartyContext } from "../contexts";

// icons
import SearchIcon from "../images/icons/search-icon.svg";

const Playlist = ({ display, topTracks, onAddTrack, adding }) => {
	if(display !== "playlist") return"";
	const party = useContext(PartyContext);
	const playlist = party.playlist;
	const[showSearch, setShowSearch] = useState(false);

	const onShowSearch = () => {
		setShowSearch(true);
	};

	const onHideSearch = () => {
		setShowSearch(false);
	};

	return(
		<section className="playlist view">
			<div className="content">
				{ showSearch
					? <Search
						onClick={onAddTrack}
						onHideSearch={onHideSearch}
						adding={adding}
					/> : (
						<>
							<TopTracks
								tracks={topTracks}
								playlist={playlist}
								onClick={onAddTrack}
								adding={adding}
							/>
							<ActivePlaylist adding={adding} />
							<FAB icon={<SearchIcon />} onClick={onShowSearch} />
						</>
					)}

			</div>

		</section>
	);
};

Playlist.propTypes = {
	display: PropTypes.string,
	topTracks: PropTypes.array,
	playlist: PropTypes.array,
	adding: PropTypes.string,
	onAddTrack: PropTypes.func
};

export default Playlist;
