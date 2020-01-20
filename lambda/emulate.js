
module.exports = () => {
	return function (req, res, next){
		req.httpMethod = req.method;
		req.queryStringParameters = req.query;
		req.pathParameters = req.params;

		next();
	};
};
