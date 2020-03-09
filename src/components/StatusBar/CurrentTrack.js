import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import PropTypes from "prop-types";

// Util
import { extractCoverImage } from "../../js/util";

export default function CurrentTrack({ currentTrack }){
	const{
		item: {
			album = null,
			artists = null,
			name = "No track is currently playing"
		} = {}
	} = currentTrack;

	const placeholderImage = getCoverImage();

	const albumName = album ? album.name : "No track";
	const CoverImg = album
		? <img className="statusBar__coverImg" src={album.images.reduce(extractCoverImage).url} alt={albumName} />
		: <Img fixed={placeholderImage} alt="No track" objectFit="cover" />;

	const artistList = artists ? artists.map( (artist, i) => {
		const last = i === artists.length - 1;
		return(<span key={artist.id} className="artist">{artist.name}{last ? "" : ", "}</span>);
	}) : "";

	return(
		<div className="statusBar__currentTrack">
			{CoverImg}
			<div className="statusBar__trackInfo">
				<span className="statusBar__trackTitle">{name}</span>
				<div className="statusBar__metaInfo">
					<span className="statusBar__trackArtist">{artistList}</span>
					{/* <span className="statusBar__trackRequestedBy">{addedBy}</span> */}
				</div>
			</div>
		</div>
	);
}

function getCoverImage(){
	const data = useStaticQuery(graphql`
		query {
			file(relativePath: { eq: "icons/cover.png" }){
				childImageSharp {
					fixed(pngQuality: 100, width: 46, height: 46){
						...GatsbyImageSharpFixed
					}
				}
			}
		}
	`);

	return data.file.childImageSharp.fixed;
}

CurrentTrack.propTypes = {
	currentTrack: PropTypes.object
};
