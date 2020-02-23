const SpotifyWebApi = require("spotify-web-api-node");
const{ db } = require("../util/functions");
require("dotenv").config();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

async function refresh(event){
	try{
		const body = event.body;
		const refreshToken = body.refreshToken;

		const spotifyApi = new SpotifyWebApi({
			clientId,
			clientSecret,
			refreshToken
		});

		const result = await spotifyApi.refreshAccessToken();
		const newAccessToken = result.body.accessToken;
		const newRefreshToken = result.body.refreshToken;

		spotifyApi.setAccessToken(newAccessToken);
		const me = await spotifyApi.getMe();
		const username = me.body.id;
		const data = { accessToken: newAccessToken };

		// Only set the refresh token if it exists. It is not returned with every refresh.
		if(newRefreshToken) data.refreshToken = newRefreshToken;

		const updated = await db({
			type: "mutation",
			name: "partialUpdateParty",
			data,
			args: { owner: username },
			returns: ["accessToken"]
		});

		return{
			statusCode: result.statusCode,
			body: JSON.stringify(result.body)
		};
	}catch(err){
		throw err;
	}
}

module.exports = refresh;
