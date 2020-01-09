async function hello (event, context){
	return{
		statusCode: 200,
		body:
			{
				message: "Go Serverless v1.0! Your function executed successfully!",
				input: event
			}

	};
}

module.exports = hello;
