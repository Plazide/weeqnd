export function getQueryParams (){
	const query = window.location.search.split("?")[1];
	const keyValuePairs = query.split("&");
	const result = {};

	keyValuePairs.forEach( item => {
		const[key, value] = item.split("=");
		result[key] = value;
	});

	return result;
}

export function calcDuration (arr){

}
