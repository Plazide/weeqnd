export default class Spotify{
	constructor ({ clientId, responseType, scopes, redirectURI }){
		this.clientId = clientId;
		this.responseType = responseType;
		this.scopes = scopes;
		this.redirectURI = redirectURI;

		this.authEndpoint = "https://accounts.spotify.com/authorize";
	}

	getLoginUrl (uri, scope){
		const scopes = scope ? encodeURIComponent(scope.join(" ")) : encodeURIComponent(this.scopes.join(" "));
		const redirectURI = uri ? encodeURIComponent(uri) : encodeURIComponent(this.redirectURI);

		return`${this.authEndpoint}?response_type=${this.responseType}&client_id=${this.clientId}${scopes ? `&scope=${scopes}` : ""}&redirect_uri=${redirectURI}`;
	}
}
