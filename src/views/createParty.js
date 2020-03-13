import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";

// Layout
import Layout from "../components/layout";
import SEO from "../components/seo";

// Components
import Button from "../components/Button/";
import Info from "../components/Info";
import Loader from "../components/Loader";
import SelectPlaylist from "../components/SelectPlaylist/";

// Util
import { auth } from "../js/util";
import spotify from "../js/spotify";

// Css
import "../styles/create.css";

const Create = () => {
	const[loaded, setLoaded] = useState(false);
	const[loadingPlaylists, setLoadingPlaylists] = useState(true);
	const[playlists, setPlaylists] = useState([]);
	const[error, setError] = useState(null);
	const[loading, setLoading] = useState(false);

	async function authenticate(){
		const authed = await auth();

		if(authed) setLoaded(true);
	}

	if(!loaded)
		authenticate();

	useEffect( () => {
		async function getPlaylists(){
			setLoadingPlaylists(true);
			const result = await spotify.getUsersPlaylists();
			const items = result.items;
			setLoadingPlaylists(false);

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

			navigate("/party/" + code);
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
						<form action="/api/party/create" onSubmit={onSubmit}>
							<Loader load={loadingPlaylists} className="loading-playlists">
								<SelectPlaylist playlists={playlists} />
								<div className={`error ${error ? "show" : ""}`} role="alert">{error}</div>
							</Loader>

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

export default Create;
