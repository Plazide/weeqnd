import spotify from "../js/spotify";
import { navigate } from "gatsby";

export function getQueryParams (){
	const search = window.location.search;
	if(!search)	return false;

	const query = search.split("?")[1];
	const keyValuePairs = query.split("&");
	const result = {};

	keyValuePairs.forEach( item => {
		const[key, value] = item.split("=");
		result[key] = value;
	});

	return result;
}

export function formatCode (str){
	if(!str) return"";
	if(str.length < 3) return str;

	const letters = str.split("");
	letters.splice(2, 0, " ");

	return letters.join("");
};

export function unformatCode (str){
	const value = str.trim();
	const letters = value.split("");
	const space = letters.indexOf(" ");

	if(space !== -1) letters.splice(space, 1);

	return letters.join("");
}

export async function auth (){
	const authed = await spotify.isAuthenticated();
	if(authed) return true;

	const query = getQueryParams();
	const code = query.code;
	const loc = window.location;
	const uri = `${loc.protocol}//${loc.host}${loc.pathname}`;
	const response = await fetch("/api/spotify/auth", {
		method: "POST",
		body: JSON.stringify({ code, uri }),
		headers: {
			"Content-Type": "application/json"
		}
	});

	if(response.ok){
		const result = await response.json();
		if(result.error){
			console.error(result.error);
			navigate("/");
		}

		spotify.setAccessToken(result.access_token);
		spotify.setRefreshToken(result.refresh_token);
		return true;
	}

	return false;
}
