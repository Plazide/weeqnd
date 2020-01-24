const SpotifyWebApi = require("spotify-web-api-node");
const{ getUsersParty, createParty, updateParty } = require("../util/functions");
const error = require("../util/error");

require("dotenv").config();

async function create (event, context){
	try{
		const body = event.body;
		const playlist = body.playlist;
		const accessToken = body.accessToken;
		const refreshToken = body.refreshToken;

		// Generate a random code that will be used to access the party.
		const code = Math.floor(Math.random() * 10000) + 10000;

		// Initialize Spotify API
		const spotifyApi = new SpotifyWebApi({
			accessToken
		});

		// Fetch the user who wants to create the party
		const data = await spotifyApi.getMe();
		const username = data.body.id;

		// If request to spotify API failed, return that error to the client.
		if(data.statusCode !== 200)
			return{
				statusCode: data.statusCode,
				body: data.body.message
			};

		// Check if the current user already has a party.
		const usersParty = await getUsersParty(username);
		if(usersParty){
			console.log(usersParty);
			const id = usersParty._id;

			const updatedParty = await updateParty(id, {
				fallbackPlaylist: playlist,
				accessToken,
				refreshToken
			});
			if(!updatedParty) return error(500, "Could not update party");

			return{
				statusCode: 200,
				body: JSON.stringify({
					message: "User has already created a party.",
					data: { code: usersParty.code }
				})
			};
		}

		// Attempt to create the party.
		try{
			const party = await createParty({
				username,
				code,
				playlist,
				accessToken,
				refreshToken
			});

			return{
				statusCode: 200,
				body: JSON.stringify({
					message: "Party has been created.",
					data: { code: party.data.createParty.code }
				})
			};
		}catch(err){
			console.error(err);

			return error(500, "Failed to create party");
		}
	}catch(err){
		console.error(err);

		return error(500, "Internal Server Error");
	}
}

module.exports = create;
