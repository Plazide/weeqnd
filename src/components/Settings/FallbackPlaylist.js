import React, { useContext, useRef } from "react";
import PropTypes from "prop-types";

// Components
import SelectPlaylist from "../SelectPlaylist/";
import Info from "../Info/";

// Contexts
import { MethodContext } from "../../contexts";

export default function FallbackPlaylist({ playlists, selected }){
	const{ updateFallbackList } = useContext(MethodContext);
	const form = useRef(null);

	const onChange = e => {
		const radios = [...form.current];
		const selected = radios.filter( radio => radio.checked)[0].value;

		updateFallbackList(selected);
	};

	return(
		<div className="settings__fallback component">
			<h2>Fallback playlist<Info>The playlist that plays when there are no requested songs</Info></h2>
			<form ref={form}>
				<SelectPlaylist playlists={playlists} selected={selected} onChange={onChange} />
			</form>

		</div>
	);
}

FallbackPlaylist.propTypes = {
	playlists: PropTypes.array,
	selected: PropTypes.string
};
