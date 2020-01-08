const hello = require("functions/hello");

module.exports.hello = async (event, context) => {
	await hello();
};
