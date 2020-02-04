import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// components
import TrackList from "./TrackList";

// Util
import useDebounce from "../js/debounce";
import spotify from "../js/spotify";

// Icons
import SearchIcon from "../images/icons/search-icon.svg";

// Css
import "./styles/search.css";

const Search = ({ playlist, onClick }) => {
	const[results, setResults] = useState([]);

	const onSearch = async (value) => {
		if(!value){
			setResults([]);
			return;
		}

		const result = await spotify.search({
			value,
			type: "track",
			limit: 10
		}, false);

		setResults(result.tracks.items);
	};

	return(
		<div className="search">
			<SearchInput onSearch={onSearch} />
			<SearchResults playlist={playlist} results={results} onClick={onClick} />
		</div>
	);
};

const SearchInput = ({ onSearch }) => {
	const[value, setValue] = useState("");
	const[focus, setFocus] = useState(false);

	const debouncedValue = useDebounce(value, 500);

	const onBlur = () => {
		if(!value)
			setFocus(false);
	};

	const onFocus = () => {
		setFocus(true);
	};

	const onChange = (e) => {
		const target = e.target;
		const value = target.value;

		setValue(value);
	};

	useEffect( () => {
		if(debouncedValue)
			onSearch(debouncedValue);
	}, [debouncedValue]);

	return(
		<div className="search-input">
			<label>
				<span className="label">{focus ? "" : "Sök på en låt..."}</span>
				<input type="text" onChange={onChange} value={value} onFocus={onFocus} onBlur={onBlur} />
				<SearchIcon className="icon" />
			</label>
		</div>
	);
};

const SearchResults = ({ results, playlist, onClick }) => {
	return(
		<section className="search-results">
			<TrackList tracks={results} playlist={playlist} onClick={onClick} />
		</section>
	);
};

export default Search;

Search.propTypes = {
	playlist: PropTypes.array.isRequired,
	onClick: PropTypes.func.isRequired
};

SearchInput.propTypes = {
	onSearch: PropTypes.func.isRequired
};

SearchResults.propTypes = {
	results: PropTypes.array.isRequired,
	playlist: PropTypes.array.isRequired,
	onClick: PropTypes.func.isRequired
};
