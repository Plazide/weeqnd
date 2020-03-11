const SpotifyWebApi = require("spotify-web-api-node");
const{ db, getUsersParty } = require("../util/functions");
const error = require("../util/error");
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
		const newAccessToken = result.body["access_token"];
		const newRefreshToken = result.body["refresh_token"];

		spotifyApi.setAccessToken(newAccessToken);
		const me = await spotifyApi.getMe().catch( err => {
			return error(err.status, err.message);
		});
		const username = me.body.id;
		const data = { accessToken: `"${newAccessToken}"` };

		// Only set the refresh token if it exists. It is not returned with every refresh.
		if(newRefreshToken) data.refreshToken = `"${newRefreshToken}"`;

		const usersParty = await getUsersParty(username);
		const partyId = usersParty._id;

		if(partyId)
			await db({
				type: "mutation",
				name: "partialUpdateParty",
				data,
				args: { id: partyId },
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

module.exports.refresh = refresh;
