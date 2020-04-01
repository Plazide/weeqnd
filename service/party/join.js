const SpotifyWebApi = require("spotify-web-api-node");
const{ getParty, getUser, createUser, db } = require("../util/functions");
const error = require("../util/error");
require("dotenv").config();
const{ objectKeysToLowerCase } = require("../util/functions");

async function join(event, context){
	try{
		event.headers = objectKeysToLowerCase(event.headers);

		if(event.headers["content-type"] !== "application/json")
			return error(400, "Incorrect Content-Type header");

		const body = JSON.parse(event.body);
		const code = body.code;
		const accessToken = event.headers["x-access-token"];

		const spotifyApi = new SpotifyWebApi({
			accessToken
		});

		const[me, party] = await Promise.all([
			spotifyApi.getMe(),
			getParty(code)
		]);

		const username = me.body.id;

		if(!party)
			return error(404, "Could not find a party using the provided code.");

		// Update the party by connecting the user to it.
		let updatedParty = await connectUser(username, party, false);

		if(!updatedParty){
			updatedParty = await connectUser(username, party, true);
			if(!updatedParty)
				return error(500, "Could not join party!");
		}

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
		if(err.statusCode === 401)
			return error(401, "Could not find the Spotify user!");

		throw new Error(err);
	}
}

async function connectUser(username, party, create = false){
	try{
		let user;

		if(!create)
			user = await getUser(username);
		else
			user = await createUser(username);

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

		return updatedParty;
	}catch(err){
		return false;
	}
}

module.exports.join = join;
