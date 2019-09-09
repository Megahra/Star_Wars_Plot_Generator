export function fetchJSON(url, resource) {
	//ToDo: handle paging

	//return fetch(url + resource + pageParam = "")
	return fetch(url + resource + "")
	.then(validateResponse)
	.then(response=>response.json())
	.then(function(responseData) {
		return responseData;
	})
	.catch(logError);
}

function logResult(result) {
	console.log("Log:" + result);
}

function logError(error) {
	console.log('Looks like there was a problem: \n', error);
  throw error;
}

function validateResponse(response) {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}

/*function mapResponse(responseData, resource) {
	let tempObject = {};

	if(resource === "people"){
		tempObject["results"] = responseData.results.map(({name,gender}) => ({name,gender}));
	} else {
		tempObject["results"] = responseData.results.map(a => a.name);
	}
	logResult(tempObject.results); //Temp line
	if(resource === "people") logResult(tempObject.results.map(a => a.name)); //Temp line */
	//tempObject["next"] = responseData.next.match(/\/\?.*/)[0];
/*  logResult(tempObject.next);

	return tempObject;
}*/