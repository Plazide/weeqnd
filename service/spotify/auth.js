const request = require("request-promise-native");
const error = require("../util/error");
const{ objectKeysToLowerCase } = require("../util/functions");

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

async function auth(event, context){
	try{
		event.headers = objectKeysToLowerCase(event.headers);

		if(event.headers["content-type"] !== "application/json")
			return error(400, "Incorrect Content-Type header");

		const body = JSON.parse(event.body);
		const code = body.code;
		const uri = body.uri;

		const credentials = `${clientId}:${clientSecret}`;
		const basicAuth = Buffer.from(credentials).toString("base64");
		const options = {
			method: "POST",
			uri: "https://accounts.spotify.com/api/token",
			body: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(uri)}`,
			headers: {
				Authorization: `Basic ${basicAuth}`,
				"Content-Type": "application/x-www-form-urlencoded"
			},
			resolveWithFullResponse: true,
			simple: false
		};

		const response = await request(options);
		const result = JSON.parse(response.body);

		return{
			statusCode: 200,
			body: JSON.stringify(result)
		};
	}catch(err){
		return{
			statusCode: err.statusCode || 500,
			body: JSON.stringify({
				message: err.message
			})
		};
	}
}

module.exports.auth = auth;
