import React from "react";
import PropTypes from "prop-types";

// Css
import "./styles/list.css";

// Icons
import PlaylistAdd from "../images/icons/playlist-add.svg";

export default function TrackList ({ tracks, onClick }){
	return(
		<ul className="list">
			{tracks.map( track => <Track track={track} key={track.id} onClick={onClick} />)}
		</ul>
	);
}

const Track = ({ track, onClick }) => {
	// eslint-disable-next-line camelcase
	const{ name, artists, album } = track;
	const image = album.images.reduce((prev, curr) => {
		if(curr.width < prev.width) return curr;
	});
	const artist = artists.map( (artist, i) => {
		const last = i === artists.length - 1;
		return(<span key={artist.id} className="artist">{artist.name}{last ? "" : ", "}</span>);
	});

	return(
		<li onClick={ () => { onClick(track.id); }}>
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
				<PlaylistAdd />
			</div>
		</li>
	);
};

TrackList.propTypes = {
	tracks: PropTypes.array.isRequired,
	title: PropTypes.string,
	onClick: PropTypes.func
};

Track.propTypes = {
	track: PropTypes.object.isRequired,
	onClick: PropTypes.func
};
