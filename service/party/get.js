const{ getParty } = require("../util/functions");
const SpotifyWebApi = require("spotify-web-api-node");
const error = require("../util/error");

async function get (event, context){
	const code = event.queryStringParameters.code;
	const accessToken = event.headers["x-access-token"];

	if(!accessToken) return error(400, "No x-access-token header provided");

	const spotifyApi = new SpotifyWebApi({ accessToken });
	const me = await spotifyApi.getMe().catch(err => {
		return error(err.statusCode, err.message);
	});

	if(me.statusCode === 401)
		return error(401, "Could not spotify user.");

	const username = me.body.id;

	const party = await getParty(code);
	const isOwner = party.owner === username;

	const secretInfo = {};

	if(isOwner){
		secretInfo.users = party.users.data;
		secretInfo.fallbackPlaylist = party.fallbackPlaylist;
	}

	return{
		statusCode: 200,
		body: JSON.stringify({
			isOwner,
			owner: party.owner,
			playlist: party.playlist,
			...secretInfo
		})
	};
}

module.exports = get;
