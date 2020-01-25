const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

async function refresh (event){
	const body = event.body;
	const refreshToken = body.refreshToken;

	const spotifyApi = new SpotifyWebApi({
		clientId,
		clientSecret,
		refreshToken
	});

	const result = await spotifyApi.refreshAccessToken();

	return{
		statusCode: result.statusCode,
		body: JSON.stringify(result.body)
	};
}

module.exports = refresh;
