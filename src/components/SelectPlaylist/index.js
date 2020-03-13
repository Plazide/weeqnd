import React from "react";
import PropTypes from "prop-types";

// Components
import PlaylistRadio from "./PlaylistRadio";

// Css
import "./style.css";

export default function SelectPlaylist({ playlists = null }){
	return(
		<div className="playlists">
			{playlists ? playlists.map( (playlist) => {
				return(
					<PlaylistRadio
						name={playlist.name}
						total={playlist.tracks.total}
						href={playlist.href}
						key={playlist.name}
					/>
				);
			}) : "loading...."}
		</div>
	);
}

SelectPlaylist.propTypes = {
	playlists: PropTypes.array
};
