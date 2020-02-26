import React, { useState, useContext } from "react";
import PropTypes from "prop-types";

// Components
import Loader from "./Loader";

// Contexts
import { MethodContext, LoadingContext } from "../contexts";

// Css
import "./styles/list.css";

// Icons
import PlaylistAdd from "../images/icons/playlist-add.svg";
import PlaylistAdded from "../images/icons/playlist-added.svg";
import MoreIcon from "../images/icons/more.svg";
import DeleteIcon from "../images/icons/delete.svg";
import SettingsIcon from "../images/icons/settings.svg";

export default function TrackList({ tracks, playlist, activePlaylist = false }){
	if(!tracks || tracks.length === 0) return(
		<div className="empty">
			<h1>Det finns inga låtar här!</h1>
		</div>
	);

	return(
		<ul className="list">
			{tracks.map( track =>
				<Track
					track={track}
					playlist={playlist}
					key={track.id}
					activePlaylist={activePlaylist}
				/>)}
		</ul>
	);
}

const Track = ({ track, playlist, activePlaylist }) => {
	const{ onAddTrack, onRemoveTrack } = useContext(MethodContext);
	const{ adding, removing } = useContext(LoadingContext);
	const{ name, artists, album, id } = track;
	const currentTrack = playlist.find( item => item.id === id);
	const inPlaylist = currentTrack !== undefined;
	const image = album.images.reduce((prev, curr) => {
		if(curr.width < prev.width) return curr;
	});
	const artist = artists.map( (artist, i) => {
		const last = i === artists.length - 1;
		return(<span key={artist.id} className="artist">{artist.name}{last ? "" : ", "}</span>);
	});

	return(
		<li className={`track ${removing === id ? "track--removing" : ""}`}>
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
				{activePlaylist && inPlaylist ? <TrackOptions track={currentTrack} onRemoveTrack={onRemoveTrack} />
					: <Loader load={adding === id} className="track-add-load">
						{!inPlaylist ? <PlaylistAdd onClick={ () => { onAddTrack(id); }} /> : <PlaylistAdded />}
					</Loader>
				}

			</div>
		</li>
	);
};

const TrackOptions = ({ onRemoveTrack, track }) => {
	const[open, setOpen] = useState(false);

	return(
		<div className="options">
			<button className="options__buttonMore" onClick={ () => { setOpen(!open); } }><MoreIcon /></button>
			<div className={`options__more ${open ? "options__more--open" : "options__more--closed"}`}>
				<button onClick={ () => { onRemoveTrack(track); }} className="options__action"><DeleteIcon /></button>
				<button className="options__action"><SettingsIcon /></button>
			</div>
		</div>
	);
};

TrackList.propTypes = {
	tracks: PropTypes.array.isRequired,
	title: PropTypes.string,
	playlist: PropTypes.array,
	adding: PropTypes.string,
	onClick: PropTypes.func,
	activePlaylist: PropTypes.bool
};

Track.propTypes = {
	track: PropTypes.object.isRequired,
	playlist: PropTypes.array,
	adding: PropTypes.string,
	onClick: PropTypes.func,
	activePlaylist: PropTypes.bool
};

TrackOptions.propTypes = {
	onRemoveTrack: PropTypes.func,
	track: PropTypes.object
};
