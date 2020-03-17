import React from "react";
import PropTypes from "prop-types";

// Components
import PlaylistRadio from "./PlaylistRadio";

// Util
import { extractCoverImage } from "../../js/util";

// Css
import "./style.css";

export default function SelectPlaylist({ playlists = null, selected }){
	return(
		<div className="playlists">
			{playlists ? playlists.map( (playlist) => {
				const cover = playlist.images.reduce(extractCoverImage).url;

				return(
					<PlaylistRadio
						cover={cover}
						name={playlist.name}
						total={playlist.tracks.total}
						href={playlist.href}
						selected={selected}
						key={playlist.name}
					/>
				);
			}) : "loading...."}
		</div>
	);
}

SelectPlaylist.propTypes = {
	playlists: PropTypes.array,
	selected: PropTypes.string
};
