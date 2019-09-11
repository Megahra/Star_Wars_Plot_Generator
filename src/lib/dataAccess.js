export async function fetchJSON(url) {
	return fetch(url)
	.then(validateResponse)
	.then(response=>response.json())
	.then(async function(response) {
		if(!response.results) return response;
		if(!response.next) return response.results;

		return response.results.concat(await fetchJSON(response.next));
	})
	.catch(logError);
}

function validateResponse(response) {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}

function logError(error) {
	console.log('Looks like there was a problem: \n', error);
  throw error;
}