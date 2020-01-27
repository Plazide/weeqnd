import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import PropTypes from "prop-types";

// Layout
import Layout from "../../components/layout";
import SEO from "../../components/seo";

// Components
import Button from "../../components/Button";
import Radio from "../../components/Radio";
import Info from "../../components/Info";
import Loader from "../../components/Loader";

// Util
import { auth } from "../../js/util";
import spotify from "../../js/spotify";

// Css
import "../../styles/create.css";

const Create = () => {
	const[loaded, setLoaded] = useState(false);
	const[playlists, setPlaylists] = useState([]);
	const[error, setError] = useState(null);
	const[loading, setLoading] = useState(false);

	async function authenticate (){
		const authed = await auth();

		if(authed) setLoaded(true);
	}

	if(!loaded)
		authenticate();

	useEffect( () => {
		async function getPlaylists (){
			const result = await spotify.getUsersPlaylists();
			const items = result.items;

			if(items)
				setPlaylists(items);
		}

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

		setLoading(true);
		const response = await fetch(endpoint, options);
		setLoading(false);

		if(response.ok){
			const result = await response.json();
			const code = result.data.code;

			window.localStorage.setItem("partyCode", code);
			navigate("/party");
		}

		if(response.status === 401){
			await spotify.refresh();
			setError("Det gick inte att hämta din profil från Spotify");
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
					<div className="select-playlist component">
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
							<Loader load={loading} className="button-container">
								<Button variant="filled">Skapa</Button>
							</Loader>
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
