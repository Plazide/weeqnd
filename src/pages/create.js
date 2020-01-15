import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Button from "../components/Button";
import Radio from "../components/Radio";

// Util
import { getQueryParams } from "../js/util";
import spotify from "../js/spotify";

// Css
import "../styles/create.css";

const Create = () => {
	const[loaded, setLoaded] = useState(false);
	const[playlists, setPlaylists] = useState([]);

	useEffect( () => {
		async function auth (){
			const authed = await spotify.isAuthenticated();
			if(authed) return setLoaded(true);

			const code = getQueryParams().code;
			const response = await fetch("/api/auth", {
				method: "POST",
				body: JSON.stringify({ code }),
				headers: {
					"Content-Type": "application/json"
				}
			});

			if(response.ok){
				const result = await response.json();

				setLoaded(true);
				spotify.setAccessToken(result.access_token);
				spotify.setRefreshToken(result.refresh_token);
			}
		}

		async function getPlaylists (){
			const result = await spotify.getUsersPlaylists();
			const items = result.items;

			console.log(items);
			setPlaylists(items);
		}

		if(!loaded)
			auth();

		if(loaded && playlists.length === 0)
			getPlaylists();
	});

	return(
		<Layout>
			<SEO
				title="Skapa en fest"
				description="Skapa en fest och bjud in dina gäster."
			/>
			<section className="hero">
				<div className="content">
					<h1>Skapa en fest</h1>
					<div className="select-playlist">
						<h2>Nödlista</h2>
						<div className="songs">
							{playlists.map( (playlist) => {
								return(
									<Playlist
										name={playlist.name}
										total={playlist.tracks.total}
										href={playlist.href}
										key={playlist.name}
									/>
								);
							})}
						</div>
					</div>

					<Button variant="filled">Skapa</Button>
				</div>
			</section>
		</Layout>
	);
};

const Playlist = ({ name, total, href }) => {
	return(
		<label htmlFor={href}>
			<div className="song">
				<span className="name">{name}</span>
				<span className="duration">
					{`${total} låtar`}
				</span>
				<Radio name="playlist" id={href} value={href} />
			</div>
		</label>
	);
};

Playlist.propTypes = {
	name: PropTypes.string,
	total: PropTypes.number,
	href: PropTypes.string
};

export default Create;
