import io from "socket.io-client";

class Socket {
	constructor({ party, accessToken }){
		this.party = party;
		this.accessToken = accessToken;
		this.socket = null;
	}

	start(){
		this.socket = io(process.env.GATSBY_WS_SERVER + this.party, {
			transports: ["websocket"],
			query: {
				accessToken: this.accessToken
			}
		});

		this.socket.on("connect", () => {
			console.log("Socket connected:", this.socket.connected);
		});

		this.socket.on("disconnect", () => {
			console.log("Socket disconnected", !this.socket.connected);

			setTimeout( () => { this.socket.connect(); }, 1000 * 5);
		});

		this.socket.on("err", data => {
			const type = data.type;
			if(this.onError)
				this.onError(type);
		});

		this.socket.on("success", data => {
			const type = data.type;
			this.onSuccess(type);
		});

		this.socket.on("track_added", data => {
			const{ trackId, playlist } = data;
			this.onTrackAdded(trackId, playlist);
		});

		this.socket.on("track_removed", data => {
			const{ trackId, playlist } = data;
			this.onTrackRemoved(trackId, playlist);
		});
	}

	addTrack(data){
		this.socket.emit("add-track", data, (res) => {
			console.log(res);
		});
	}

	removeTrack(data){
		this.socket.emit("remove-track", data, (res) => {
			console.log(res);
		});
	}
}

export default Socket;
