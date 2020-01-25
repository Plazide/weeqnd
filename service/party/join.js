const SpotifyWebApi = require("spotify-web-api-node");
const{ getParty, getUser, createUser, db } = require("../util/functions");
const error = require("../util/error");
require("dotenv").config();

async function join (event, context){
	const code = event.body.code;
	const accessToken = event.headers["x-access-token"];

	const spotifyApi = new SpotifyWebApi({
		accessToken
	});

	try{
		// Get spotify username
		const me = await spotifyApi.getMe().catch(err => {
			return error(err.statusCode, err.message);
		});

		if(me.statusCode === 401)
			return error(401, "Could not find the Spotify user!");

		const username = me.body.id;

		// Get party by code
		const party = await getParty(code);
		if(!party)
			return error(404, "Could not find a party using the provided code.");

		// Get the stored user or create a new user.
		let user = await getUser(username);
		if(!user)
			user = await createUser(username);

		// Update the party by connecting the user to it.
		const updatedParty = await db({
			type: "mutation",
			name: "partialUpdateParty",
			data: {
				users: `{ connect: ${user._id} }`
			},
			args: {
				id: party._id
			},
			returns: [
				"owner",
				"_id",
				"code"
			]
		});
		if(!updatedParty)
			return error(500, "Could not add user to database");

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
	}catch(err){
		throw new Error(err);
	}
}

module.exports = join;
