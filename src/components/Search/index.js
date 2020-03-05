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

			<SearchResults playlist={playlist} results={results} />
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
