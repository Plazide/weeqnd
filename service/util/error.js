function error (status, message){
	return{
		statusCode: status,
		body: JSON.stringify({
			status,
			message
		})
	};
}

module.exports = error;
