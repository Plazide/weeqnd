import React, { useState } from "react";

// Icons
import SearchIcon from "../images/icons/search-icon.svg";

// Css
import "./styles/search.css";

const Search = ({ topTracks }) => {
	const[focus, setFocus] = useState(false);

	const onFocus = () => {
		if(!focus) setFocus(true);
	};

	const onBlur = () => {
		if(focus) setFocus(false);
	};

	return(
		<div className="search">
			<label>
				<input onFocus={onFocus} onBlur={onBlur} name="search" type="text" />
				<SearchIcon className="icon" />
			</label>
			<SearchResults />
		</div>
	);
};

const SearchResults = () => {
	return(
		<section className="search-results">

		</section>
	);
};

export default Search;
