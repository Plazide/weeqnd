import React from "react";

const Playlist = ({ display }) => {
	console.log(display);
	if(display !== "playlist") return"";

	return(
		<div className="playlist view">
			<input className="search-input" />
		</div>
	);
};

export default Playlist;
