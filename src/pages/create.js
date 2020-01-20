import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import PropTypes from "prop-types";

// Layout
import Layout from "../components/layout";
import SEO from "../components/seo";

// Components
import Button from "../components/Button";
import Radio from "../components/Radio";
import Info from "../components/Info";

// Util
import { getQueryParams } from "../js/util";
import spotify from "../js/spotify";

// Css
import "../styles/create.css";

const Create = () => {
	const[loaded, setLoaded] = useState(false);
	const[playlists, setPlaylists] = useState([]);
	const[error, setError] = useState(null);

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
				if(result.error)
					navigate("/");

				spotify.setAccessToken(result.access_token);
				spotify.setRefreshToken(result.refresh_token);
				setLoaded(true);
			}
		}

		async function getPlaylists (){
			const result = await spotify.getUsersPlaylists();
			const items = result.items;

			if(items)
				setPlaylists(items);
		}

		if(!loaded)
			auth();

		if(loaded && playlists.length === 0)
			getPlaylists();
	});

	const onSubmit = async (e) => {
		e.preventDefault();

		const form = e.target;
		const endpoint = form.action;
		const playlist = form.querySelector("[name=\"playlist\"]:checked");

		if(!playlist)
			return setError("Välj en spellista!");

		const options = {
			method: "POST",
			body: JSON.stringify({
				playlist: playlist.value,
				accessToken: spotify.accessToken,
				refreshToken: spotify.refreshToken
			}),
			headers: {
				"Content-Type": "application/json"
			}
		};

		const response = await fetch(endpoint, options);

		if(response.ok){
			const result = await response.json();
			const code = result.data.code;

			window.localStorage.setItem("partyCode", code);
			navigate("/party");
		}
	};

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
						<h2>Nödlista <Info>Listan som kommer att spelas om kön är tom.</Info></h2>

						<form action="/api/create" onSubmit={onSubmit}>
							<div className="songs">
								{playlists ? playlists.map( (playlist) => {
									return(
										<Playlist
											name={playlist.name}
											total={playlist.tracks.total}
											href={playlist.href}
											key={playlist.name}
										/>
									);
								}) : "loading...."}
							</div>
							<div className={`error ${error ? "show" : ""}`} role="alert">{error}</div>
							<Button variant="filled">Skapa</Button>
						</form>

					</div>

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
