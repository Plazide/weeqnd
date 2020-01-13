require("dotenv").config();

async function create (event, context){
	return{
		statusCode: 200,
		body: JSON.stringify({
			message: "Created!"
		})
	};
}

module.exports = create;
