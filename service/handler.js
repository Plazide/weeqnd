const create = require("./party/create");
const join = require("./party/join");
const auth = require("./spotify/auth");
const refresh = require("./spotify/refresh");

module.exports = {
	// Party controllers
	create: async ( event, context ) => create(event, context),
	join: async ( event, context ) => join(event, context),

	// Spotify functions
	auth: async ( event, context ) => auth(event, context),
	refresh: async ( event, context ) => refresh(event, context)
};
