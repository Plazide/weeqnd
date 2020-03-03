import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import BackgroundImage from "gatsby-background-image";

// Util
import spotify from "../js/spotify";

// Components
import LinkButton from "../components/LinkButton";

// Css
import "../styles/start.css";

const IndexPage = ({ data }) => {
	return(
		<Layout>
			<SEO
				title="Förenklad festmusik"
				description="Låt gästerna köa musik från sina egna telefoner under hemmafesten."
			/>
			<BackgroundImage
				Tag="section"
				className="hero"
				fluid={data.mobile.childImageSharp.fluid}
				fadeIn={false}
				loading="eager"
			>
				<div className="content">
					<h1>Dina hemmafester blev precis lite roligare</h1>
					<p>Med SpotiFest kan alla vara med och bestämma musik. Låt dina gäster vara med och bestämma musik genom sina egna telefoner.</p>
					<div className="buttons">
						<LinkButton
							variant="filled"
							to={spotify.getLoginUrl(process.env.GATSBY_SERVER_HOST + "/party/create/", ["playlist-read-private", "streaming", "user-modify-playback-state", "user-top-read", "user-read-playback-state", "user-read-currently-playing"])}
							external={true}>
							Skapa en fest
						</LinkButton>

						<LinkButton
							variant="outlined"
							to={spotify.getLoginUrl(process.env.GATSBY_SERVER_HOST + "/party/join/", ["user-top-read"])}
							external={true}>
							Gå med i fest
						</LinkButton>
					</div>
				</div>
			</BackgroundImage>
		</Layout>
	);
};

export const pageQuery = graphql`
	query {
		mobile: file(relativePath: { eq: "backgrounds/start_mobile.jpg" }) {
			childImageSharp {
				fluid (quality: 90, maxWidth: 600){
					...GatsbyImageSharpFluid
				}
			}
		}
	}
`;

export default IndexPage;

IndexPage.propTypes = {
	data: PropTypes.object
};
