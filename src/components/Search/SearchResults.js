import React, { useContext } from "react";
import PropTypes from "prop-types";

// Components
import TrackList from "../Playlist/TrackList";
import TopTracks from "../Playlist/TopTracks";

// Contexts
import { PartyContext, MethodContext, LoadingContext } from "../../contexts";

const SearchResults = ({ results, playlist }) => {
	const{ topTracks } = useContext(PartyContext);
	const{ onAddTrack } = useContext(MethodContext);
	const{ adding } = useContext(LoadingContext);

	if(results.length === 0 || !results)
		return(
			<TopTracks tracks={topTracks} playlist={playlist} onClick={onAddTrack} adding={adding} />
		);

	return(
		<section className="search-results">
			<TrackList tracks={results} playlist={playlist} onClick={onAddTrack} adding={adding} />
		</section>
	);
};

SearchResults.propTypes = {
	results: PropTypes.array.isRequired,
	playlist: PropTypes.array.isRequired
};

export default SearchResults;
