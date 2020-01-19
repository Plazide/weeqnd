const gql = require("graphql-tag");
const client = require("../util/ApolloClient");

async function checkUser (username){
	const findPartyByOwner = gql`
	query {
		findPartyByOwner(owner: "${username}"){
			owner
		}
	}
	`;

	const ownerResult = await client.query({ query: findPartyByOwner });
	const party = ownerResult.data.findPartyByOwner;

	if(party) return true;
	else return false;
}

async function getParty (code){
	const partyQuery = gql`
	query {
		findPartyByCode(code: ${code}){
			owner
			playlist
			users
			accessToken
			users
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
	checkUser,
	createParty,
	getParty
};
