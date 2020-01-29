export class Spotify{
	constructor ({ clientId, responseType, scopes, redirectURI }){
		this.clientId = clientId;
		this.responseType = responseType;
		this.scopes = scopes;
		this.redirectURI = redirectURI;

		this.authEndpoint = "https://accounts.spotify.com/authorize";
		this.accessToken = typeof window !== "undefined" ? window.localStorage.getItem("access_token") : null;
		this.refreshToken = typeof window !== "undefined" ? window.localStorage.getItem("refresh_token") : null;
	}

	setAccessToken (token){
		this.accessToken = token;

		if(typeof window !== "undefined")
			window.localStorage.setItem("access_token", token);
	}

	setRefreshToken (token){
		this.refreshToken = token;

		if(typeof window !== "undefined")
			window.localStorage.setItem("refresh_token", token);
	}

	async isAuthenticated (){
		if(!this.accessToken || this.accessToken === "undefined") return false;

		const user = await this.getCurrentUser(true);
		console.log(user);
		if(user.ok) return true;

		return false;
	}

	async _post (endpoint, data){
		const options = {
			method: "POST",
			body: JSON.stringify(data)
		};

		return this._request(endpoint, options);
	}

	async _get (endpoint){
		const options = {
			method: "GET"
		};

		return this._request(endpoint, options);
	}

	async _request (endpoint, options){
		options.headers = {};
		options.headers["Authorization"] = `Bearer ${this.accessToken}`;

		return fetch(endpoint, options);
	}

	getLoginUrl (uri, scope){
		const scopes = scope ? encodeURIComponent(scope.join(" ")) : encodeURIComponent(this.scopes.join(" "));
		const redirectURI = uri ? encodeURIComponent(uri) : encodeURIComponent(this.redirectURI);

		return`${this.authEndpoint}?response_type=code&client_id=${this.clientId}${scopes ? `&scope=${scopes}` : ""}&redirect_uri=${redirectURI}`;
	}

	async refresh (){
		const response = await fetch("/api/spotify/refresh", {
			method: "POST",
			body: JSON.stringify({
				refreshToken: this.refreshToken
			}),
			headers: {
				"Content-Type": "application/json"
			}
		});

		const result = await response.json();

		this.setAccessToken(result.access_token);
		if(result.refresh_token)
			this.setRefreshToken(result.refresh_token);
	}

	/**
	 * Get the current user's profile.
	 * @param {bool} full - Whether or not to return the full response object.
	 */
	async getCurrentUser (full){
		const endpoint = "https://api.spotify.com/v1/me";
		const response = await this._get(endpoint);

		if(full)
			return response;

		return response.json();
	}

	/**
	 * Get the current user's playlists
	 * @param {bool} full - Whether or not to return the full response object.
	 */
	async getUsersPlaylists (full){
		const endpoint = "https://api.spotify.com/v1/me/playlists";
		const response = await this._get(endpoint);

		if(full)
			return response;

		return response.json();
	}

	async getPlaylistTracks (href, full){
		const response = await this._get(href);

		if(full)
			return response;

		return response.json();
	}
}

const spotify = new Spotify({
	clientId: process.env.SPOTIFY_CLIENT_ID
});

export default spotify;
