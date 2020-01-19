const SpotifyWebApi = require("spotify-web-api-node");
const{ checkUser, createParty } = require("../util/functions");

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
		const usernameExists = await checkUser(username);
		if(usernameExists)
			return{
				statusCode: 409,
				body: JSON.stringify({
					message: "Party already exists"
				})
			};

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
					message: "Created!",
					data: { code: party.data.createParty.code }
				})
			};
		}catch(err){
			console.error(err);

			return{
				statusCode: 500,
				body: JSON.stringify({
					message: "Failed to create party"
				})
			};
		}
	}catch(err){
		console.error(err);

		return{
			statusCode: 500,
			body: JSON.stringify({
				message: "Internal Server Error"
			})
		};
	}
}

module.exports = create;
