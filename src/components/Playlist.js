import React, { useState } from "react";
import PropTypes from "prop-types";

// Components
import Search from "./Search";
import TopTracks from "./TopTracks";
import FAB from "./FAB";

// icons
import SearchIcon from "../images/icons/search-icon.svg";

const Playlist = ({ display, playlist, topTracks, onClick }) => {
	if(display !== "playlist") return"";
	const[showSearch, setShowSearch] = useState(false);

	const onShowSearch = () => {
		setShowSearch(true);
	};

	return(
		<section className="playlist view">
			<div className="content">
				{ showSearch ? <Search onClick={onClick} playlist={playlist} /> : (
					<>
						<TopTracks tracks={topTracks} playlist={playlist} onClick={onClick} />
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
	onClick: PropTypes.func
};

export default Playlist;
