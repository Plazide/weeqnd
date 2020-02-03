import React from "react";
import PropTypes from "prop-types";

// Css
import "./styles/list.css";

// Icons
import PlaylistAdd from "../images/icons/playlist-add.svg";
import PlaylistAdded from "../images/icons/playlist-added.svg";

export default function TrackList ({ tracks, playlist, onClick }){
	return(
		<ul className="list">
			{tracks.map( track => <Track track={track} playlist={playlist} key={track.id} onClick={onClick} />)}
		</ul>
	);
}

const Track = ({ track, playlist, onClick }) => {
	const{ name, artists, album, id } = track;
	const inPlaylist = playlist.includes(id);
	const image = album.images.reduce((prev, curr) => {
		if(curr.width < prev.width) return curr;
	});
	const artist = artists.map( (artist, i) => {
		const last = i === artists.length - 1;
		return(<span key={artist.id} className="artist">{artist.name}{last ? "" : ", "}</span>);
	});

	return(
		<li>
			<div className="column cover">
				<img src={image.url} alt={`${album.name} cover`} />
			</div>
			<div className="column">
				<span className="name">{name}</span>
				<div className="meta">
					{artist}
				</div>

			</div>
			<div className="column add">
				{!inPlaylist ? <PlaylistAdd onClick={ () => { onClick(track.id); }} /> : <PlaylistAdded />}
			</div>
		</li>
	);
};

TrackList.propTypes = {
	tracks: PropTypes.array.isRequired,
	title: PropTypes.string,
	playlist: PropTypes.array,
	onClick: PropTypes.func
};

Track.propTypes = {
	track: PropTypes.object.isRequired,
	playlist: PropTypes.array,
	onClick: PropTypes.func
};
