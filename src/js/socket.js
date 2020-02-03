import io from "socket.io-client";

class Socket {
	constructor ({ party, accessToken }){
		this.party = party;
		this.accessToken = accessToken;
		this.socket = null;
		this.onError = null;
		this.onSuccess = null;
	}

	start (){
		this.socket = io("ws://localhost:5000/" + this.party, {
			transports: ["websocket"],
			query: {
				accessToken: this.accessToken
			}
		});

		this.socket.on("connect", () => {
			console.log("Socket connected:", this.socket.connected);
		});

		this.socket.on("err", data => {
			const type = data.type;
			this.onError(type);
		});

		this.socket.on("success", data => {
			const type = data.type;
			this.onSuccess(type);
		});
	}

	addTrack (data){
		this.socket.emit("add-track", data, (res) => {
			console.log(res);
		});
	}
}

export default Socket;
