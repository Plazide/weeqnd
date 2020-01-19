const SpotifyWebApi = require("spotify-web-api-node");
const{ getParty } = require("../util/functions");
require("dotenv").config();

async function join (event, context){
	const query = event.queryStringParameters;
	const code = query.code;
	const accessToken = event.headers["x-access-token"];

	const spotifyApi = new SpotifyWebApi({
		accessToken
	});

	const me = await spotifyApi.getMe();
	const username = me.body.id;

	const party = await getParty(code);
	const isOwner = party.owner === username;

	return{
		statusCode: 200,
		body: JSON.stringify({
			data: {
				isOwner,
				...party
			}
		})
	};
}

module.exports = join;
