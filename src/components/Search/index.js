import React, { useState, useContext } from "react";
import { Link } from "@reach/router";
import PropTypes from "prop-types";

// components
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

// Util
import spotify from "../../js/spotify";

// Contexts
import { PartyContext } from "../../contexts";

// Icons
import BackArrowIcon from "../../images/icons/back-arrow.svg";

// Css
import "./style.css";

const Search = () => {
	const party = useContext(PartyContext);
	const playlist = party.playlist;
	const limit = 25;
	const[results, setResults] = useState([]);
	const[currentValue, setCurrentValue] = useState(null);
	const[prevValue, setPrevValue] = useState(null);
	const[offset, setOffset] = useState(limit);
	const[loadingMore, setLoadingMore] = useState(false);

	const onSearch = async (value) => {
		setCurrentValue(value);

		if(value === prevValue) return;

		if(!value){
			setResults([]);
			return;
		}

		const result = await spotify.search({
			value,
			type: "track",
			limit,
			offset: 0
		}, false);

		setPrevValue(value);
		setResults(result.tracks.items);
		setOffset(limit);
	};

	async function loadMore(){
		if(!currentValue) return;
		const newOffset = offset + limit;

		const result = await spotify.search({
			value: currentValue,
			type: "track",
			limit,
			offset: newOffset
		});

		setOffset(newOffset);
		setResults([...results, ...result.tracks.items]);
	};

	const onScroll = async e => {
		const container = e.target;
		const scrollHeight = container.scrollHeight;
		const height = container.clientHeight;
		const scrollPos = container.scrollTop;
		const threshold = height + scrollPos;

		if(threshold >= scrollHeight){
			setLoadingMore(true);
			await loadMore();
			setLoadingMore(false);
		}
	};

	return(
		<div className="search" onScroll={onScroll}>

			<SearchResults playlist={playlist} results={results} loadingMore={loadingMore} />
			<div className="search__menu">
				<Link className="search__button" to="../">
					<BackArrowIcon className="search__buttonIcon" />
				</Link>

				<SearchInput onSearch={onSearch} />
			</div>
		</div>
	);
};

export default Search;

Search.propTypes = {
	adding: PropTypes.string,
	onHideSearch: PropTypes.func
};
