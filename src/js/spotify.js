export class Spotify{
	constructor ({ clientId, responseType, scopes, redirectURI }){
		this.clientId = clientId;
		this.responseType = responseType;
		this.scopes = scopes;
		this.redirectURI = redirectURI;

		this.authEndpoint = "https://accounts.spotify.com/authorize";
		this.accessToken = window.localStorage.getItem("access_token");
		this.refreshToken = window.localStorage.getItem("refresh_token");
	}

	setAccessToken (token){
		this.accessToken = token;

		window.localStorage.setItem("access_token", token);
	}

	setRefreshToken (token){
		this.refreshToken = token;

		window.localStorage.setItem("refresh_token", token);
	}

	async isAuthenticated (){
		if(!this.accessToken || this.accessToken === "undefined") return false;

		const user = await this.getCurrentUser(true);
		if(!user.ok) return false;

		return true;
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
	clientId: "1efbe433315c45d48112a3dbcf2dd4fc"
});

export default spotify;
