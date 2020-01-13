async function hello (event, context){
	try{
		const body = JSON.stringify({
			message: "Go Serverless v1.0! Your function executed successfully!"
		});

		return{
			statusCode: 200,
			body
		};
	}catch(err){
		console.error(err);
	}
}

module.exports = hello;
