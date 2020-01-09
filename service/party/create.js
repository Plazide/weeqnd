require("dotenv").config();

async function create (event, context){
	return{
		statusCode: 200,
		body: {
			message: "Created!"
		}
	};
}

module.exports = create;
