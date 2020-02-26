import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

// components
import TrackList from "./TrackList";
import TopTracks from "./TopTracks";

// Util
import useDebounce from "../js/debounce";
import spotify from "../js/spotify";

// Contexts
import { PartyContext, MethodContext, LoadingContext } from "../contexts";

// Icons
import SearchIcon from "../images/icons/search-icon.svg";
import BackArrowIcon from "../images/icons/back-arrow.svg";

// Css
import "./styles/search.css";

const Search = ({ onClick, onHideSearch, adding }) => {
	const party = useContext(PartyContext);
	const[results, setResults] = useState([]);
	const[prevValue, setPrevValue] = useState(null);
	const playlist = party.playlist;

	const onSearch = async (value) => {
		if(value === prevValue) return;

		if(!value){
			setResults([]);
			return;
		}

		const result = await spotify.search({
			value,
			type: "track",
			limit: 10
		}, false);

		setPrevValue(value);
		setResults(result.tracks.items);
	};

	return(
		<div className="search">
			<div className="content">
				<BackArrowIcon onClick={onHideSearch} className="back" />
				<SearchInput onSearch={onSearch} />
				<SearchResults playlist={playlist} results={results} onClick={onClick} adding={adding} />
			</div>
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

	const onSubmit = (e) => {
		e.preventDefault();
		onSearch(value);
	};

	useEffect( () => {
		if(debouncedValue)
			onSearch(debouncedValue);
	}, [debouncedValue]);

	return(
		<div className="search-input">
			<form onSubmit={onSubmit}>
				<label>
					<span className="label">{focus ? "" : "Sök på en låt..."}</span>
					<input type="text" onChange={onChange} value={value} onFocus={onFocus} onBlur={onBlur} />
					<button><SearchIcon className="icon" /></button>
				</label>
			</form>
		</div>
	);
};

const SearchResults = ({ results, playlist, onClick }) => {
	const{ topTracks } = useContext(PartyContext);
	const{ onAddTrack } = useContext(MethodContext);
	const{ adding } = useContext(LoadingContext);

	if(results.length === 0 || !results)
		return(
			<TopTracks tracks={topTracks} playlist={playlist} onClick={onAddTrack} adding={adding} />
		);

	return(
		<section className="search-results">
			<TrackList tracks={results} playlist={playlist} onClick={onClick} adding={adding} />
		</section>
	);
};

export default Search;

Search.propTypes = {
	onClick: PropTypes.func.isRequired,
	adding: PropTypes.string,
	onHideSearch: PropTypes.func
};

SearchInput.propTypes = {
	onSearch: PropTypes.func.isRequired
};

SearchResults.propTypes = {
	results: PropTypes.array.isRequired,
	playlist: PropTypes.array.isRequired,
	adding: PropTypes.string,
	onClick: PropTypes.func.isRequired
};
