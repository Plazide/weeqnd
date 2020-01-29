const gql = require("graphql-tag");
const client = require("../util/ApolloClient");

function obj2gql (obj){
	let result = "";

	Object.keys(obj).forEach( key => {
		const value = obj[key];

		result += `${key}: ${typeof value === "string" ? `${value}` : value},`;
	});

	return result;
}

/**
 * Make a request to the fauna database.
 * @param {object} options - Options for the request.
 * @param {string} options.type - The type of request. Can be "query" or "mutation"
 * @param {string[]} options.returns - The fields to return.
 * @param {string} options.name - The name of the query or mutation.
 * @param {object} [options.data] - The data to update or create in a mutation.
 * @param {object} [options.args] - The arguments to pass to the mutation or query. "data" argument is passed automatically.
 */
async function db ({ type, returns, name, data, args }){
	if(type !== "mutation" && type !== "query")
		throw new RangeError("type must be either 'query' or 'mutation'");

	let returnString = "",
		dataString = "",
		argsString = "";

	returns.forEach( str => {
		returnString += `${str},`;
	});

	if(data) dataString = obj2gql(data);
	if(args) argsString = obj2gql(args);
	console.log(dataString);

	const dataArg = `data: { ${dataString} }`;
	const queryArgs = args || data ? `(${dataArg}, ${argsString})` : "";
	const action = type === "query" ? "query" : "mutate";
	const query = gql`
	${type} {
		${name}${queryArgs}{
			${returnString}
		}
	}`;
	const result = await client[action]({ [type]: query });
	return result.data[name];
}

async function getUsersParty (username){
	const findPartyByOwner = gql`
	query {
		findPartyByOwner(owner: "${username}"){
			owner
			code
			_id
		}
	}
	`;

	const ownerResult = await client.query({ query: findPartyByOwner });
	const party = ownerResult.data.findPartyByOwner;

	return party;
}

async function createUser (username){
	const createUserQuery = gql`
	mutation {
		createUser(data: {
			name: "${username}"
		}){
			_id
			name
		}
	}`;

	const result = client.mutate({ mutation: createUserQuery });
	console.log(result);
	return result.data.createUser;
}

async function getUser (username){
	const findUserQuery = gql`
	query {
		findUserByName( name: "${username}"){
			_id
			name
		}
	}`;

	const result = await client.query({ query: findUserQuery });
	return result.data.findUserByName;
}

async function updateParty (_id, updates, returns){
	let updateString = "",
		returnString = "";
	Object.keys(updates).forEach( key => {
		const value = updates[key];
		updateString += `${key}: ${typeof value === "string" ? `"${value}"` : value},`;
	});
	returns.forEach( str => {
		returnString += `${str},`;
	});
	const updatePartyById = gql`
	mutation {
		partialUpdateParty(id: ${_id}, data:{
			${updateString}
		}){
			${returnString}
		}
	}`;

	const result = await client.mutate({ mutation: updatePartyById });
	return result.data.partialUpdateParty;
}

async function getParty (code){
	if(!code) return null;

	const partyQuery = gql`
	query {
		findPartyByCode(code: ${code}){
			owner
			playlist
			fallbackPlaylist
			accessToken
			code
			_id
			users {
				data {
					name
				}
			}
		}
	}
	`;

	const result = await client.query({ query: partyQuery });
	return result.data.findPartyByCode;
}

async function createParty ({ username, playlist, accessToken, refreshToken, code }){
	const createParty = gql`
	mutation {
		createParty(
			data: {
				owner: "${username}"
				code: ${code}
				accessToken: "${accessToken}"
				refreshToken: "${refreshToken}"
				fallbackPlaylist: "${playlist}"
			}
		){
			code
		}
	}
	`;

	const result = await client.mutate({ mutation: createParty });

	return result;
}

module.exports = {
	db,
	getUsersParty,
	createParty,
	getParty,
	updateParty,
	getUser,
	createUser
};
