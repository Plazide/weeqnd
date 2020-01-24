const create = require("./party/create");
const join = require("./party/join");
const auth = require("./spotify/auth");

module.exports = {
	// Party controllers
	create: async ( event, context ) => create(event, context),
	join: async ( event, context ) => join(event, context),

	// Spotify functions
	auth: async ( event, context ) => auth(event, context)
};
