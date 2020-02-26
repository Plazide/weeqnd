import React, { useState } from "react";
import PropTypes from "prop-types";

// Components
import Search from "./Search";
import FAB from "./FAB";
import ActivePlaylist from "./ActivePlaylist";

// icons
import SearchIcon from "../images/icons/search-icon.svg";

const Playlist = ({ display, onAddTrack, adding }) => {
	if(display !== "playlist") return"";
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
	adding: PropTypes.string,
	onAddTrack: PropTypes.func
};

export default Playlist;
