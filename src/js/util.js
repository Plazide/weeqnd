// Polyfill
import "share-api-polyfill";

import spotify from "../js/spotify";
import { navigate } from "gatsby";

export async function share(options){
	try{
		navigator.share(options);
	}catch(err){
		console.error("Could not share");
	}
}

export function getQueryParams(){
	const search = typeof window !== "undefined" ? window.location.search : null;
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

export function formatCode(str){
	if(!str) return"";
	if(str.length < 3) return str;

	const letters = str.split("");
	letters.splice(2, 0, " ");

	return letters.join("");
};

export function formatDuration(ms){
	const durationParts = new Intl.DateTimeFormat("sv", {
		minute: "numeric",
		second: "numeric"
	}).formatToParts(ms);

	const duration = `${durationParts[0].value}m ${durationParts[2].value}s`;

	return duration;
}

export function unformatCode(str){
	const value = str.trim();
	const letters = value.split("");
	const space = letters.indexOf(" ");

	if(space !== -1) letters.splice(space, 1);

	return letters.join("");
}

export function splitTrack(track){
	const parts = track.split(":");
	const id = parts[0];
	const username = parts[1];
	const timeAdded = parts[2];

	return{ id, username, timeAdded };
}

export async function auth(){
	const authed = await spotify.isAuthenticated();
	if(authed) return true;
	if(typeof window === "undefined") return false;

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

export function extractCoverImage( prev, curr){
	if(curr.width < prev.width) return curr;
}
