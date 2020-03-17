import React, { useContext } from "react";
import PropTypes from "prop-types";

// Components
import SelectPlaylist from "../SelectPlaylist/";
import Info from "../Info/";
import Button from "../Button/";

// Contexts
import { MethodContext } from "../../contexts";

export default function FallbackPlaylist({ playlists, selected }){
	const{ updateFallbackList } = useContext(MethodContext);

	const onSubmit = e => {
		e.preventDefault();

		const form = e.target;
		const radios = [...form];
		const selected = radios.filter( radio => radio.checked)[0].value;

		updateFallbackList(selected);
	};

	return(
		<div className="settings__fallback component">
			<h2>Fallback playlist<Info>The playlist that plays when there are no requested songs</Info></h2>
			<form onSubmit={onSubmit}>
				<SelectPlaylist playlists={playlists} selected={selected} />
				<Button variant="filled" className="settings__fallbackPlaylist__button">Save</Button>
			</form>

		</div>
	);
}

FallbackPlaylist.propTypes = {
	playlists: PropTypes.array,
	selected: PropTypes.string
};
