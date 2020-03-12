const{ getParty } = require("../util/functions");
const SpotifyWebApi = require("spotify-web-api-node");
const error = require("../util/error");

async function get(event, context){
	const code = event.queryStringParameters.code;
	const accessToken = event.headers["x-access-token"];

	if(!accessToken) return error(400, "No x-access-token header provided");

	try{
		const spotifyApi = new SpotifyWebApi({ accessToken });
		const[me, party] = await Promise.all([
			spotifyApi.getMe(),
			getParty(code)
		]);

		if(!party)
			return error(404, "The provided code does not belong to a party");

		const partyAccessToken = party.accessToken;
		spotifyApi.setAccessToken(partyAccessToken);

		const trackResult = await spotifyApi.getMyCurrentPlayingTrack();
		const currentTrack = trackResult.statusCode === 200 ? trackResult.body : {};

		if(currentTrack.item){
			const playlist = party.playlist.map( track => {
				const parts = track.split(":");

				return{ id: parts[0], username: parts[1], timeAdded: parts[2] };
			});
			const trackId = currentTrack.item.id;
			const addedBy = playlist.find( track => trackId === track.id);

			currentTrack.addedBy = addedBy !== undefined ? addedBy.username : "fallback playlist";
		}

		const username = me.body.id;
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
				active: party.active,
				owner: party.owner,
				playlist: party.playlist,
				currentTrack,
				...secretInfo
			})
		};
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

module.exports.get = get;
