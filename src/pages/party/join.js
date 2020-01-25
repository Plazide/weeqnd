import React, { useRef, useEffect, useState } from "react";
import { navigate } from "gatsby";

// Util
import { getQueryParams, formatCode, auth, unformatCode } from "../../js/util";
import spotify from "../../js/spotify";

// Layout
import Layout from "../../components/layout";
import SEO from "../../components/seo";

// Components
import Info from "../../components/Info";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

// Css
import "../../styles/join.css";

const JoinPage = () => {
	const[party, setParty] = useState("");
	const[error, setError] = useState("");
	const[loading, setLoading] = useState(false);
	const[authTried, setAuthTried] = useState(false);
	const input = useRef(null);
	const query = getQueryParams();

	useEffect( () => {
		input.current.focus();

		if(query && party === null)
			setParty(query.party);

		if((!spotify.accessToken || spotify.accessToken === "undefined") && !authTried){
			setAuthTried(true);
			auth();
		}
	});

	const onChange = (e) => {
		const value = unformatCode(e.target.value);
		const bool = (value.length < party.length || !isNaN(value)) && value.length <= 5;

		if(bool) setParty(value);
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		const form = e.target;
		const method = form.method;
		const action = form.action;
		const code = unformatCode(form.querySelector("input.join-input").value);

		if(!code) return setError("Skriv i en kod");

		setLoading(true);
		const response = await fetch(action, {
			method,
			body: JSON.stringify({
				code
			}),
			headers: {
				"Content-Type": "application/json",
				"x-access-token": spotify.accessToken
			}
		});

		if(response.ok){
			const result = await response.json();
			const providedCode = result.data.code;
			window.localStorage.setItem("partyCode", providedCode);
			navigate("/party");
		}

		console.log(response.status);

		if(response.status === 401){
			await spotify.refresh();
			setError("Det gick inte att hämta din profil från Spotify. Försök igen!");
		}

		if(response.status === 404) setError("Det verkar inte finns någon fest med den koden");
		if(response.status === 500) setError("Något gick fel!");

		setLoading(false);
	};

	return(
		<Layout>
			<SEO
				title="Gå med i fest"
				description="Gå med i en fest"
			/>
			<section className="join">
				<div className="content">
					<h1>Gå med i fest</h1>

					<section className="enter-code component">
						<h2>Festkod<Info>Fråga ägaren av rummet om koden</Info></h2>
						<form action="/api/join" method="POST" className="join-form" onSubmit={onSubmit}>
							<input
								ref={input}
								value={formatCode(party)}
								onChange={onChange}
								className="join-input"
							/>
							<div className={`error ${error ? "show" : ""}`} role="alert">{error}</div>
							<Loader load={loading} className="button-container">
								<Button variant="filled">Gå med</Button>
							</Loader>
						</form>
					</section>

				</div>
			</section>

		</Layout>

	);
};

export default JoinPage;
