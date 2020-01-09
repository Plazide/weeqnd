const request = require("request-promise-native");
require("dotenv").config();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

async function auth (event, context){
	try{
		const code = event.query.code;

		if(!code)
			return{
				statusCode: 301,
				headers: {
					Location: "http://localhost:8000"
				}
			};

		const credentials = `${clientId}:${clientSecret}`;
		const basicAuth = Buffer.from(credentials).toString("base64");
		const options = {
			method: "POST",
			uri: "https://accounts.spotify.com/api/token",
			body: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent("http://localhost:8000/api/auth")}`,
			headers: {
				Authorization: `Basic ${basicAuth}`,
				"Content-Type": "application/x-www-form-urlencoded"
			},
			resolveWithFullResponse: true,
			simple: false
		};

		const response = await request(options);
		const result = response.body;

		return{
			statusCode: 301,
			headers: {
				Location: `http://localhost:8000/create?access_token=${result.access_token}&refresh_token=${result.refresh_token}&token_type=${result.token_type}`
			}
		};
	}catch(err){
		console.error(err);
	}
}

module.exports = auth;
