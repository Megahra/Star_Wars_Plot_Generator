import {fetchJSON} from "./dataAccess";

const baseApiUrl = "https://swapi.co/api/";

const fetchStarWarsApi = resource => fetchJSON(baseApiUrl,resource);

export const fetchPeople = () => fetchStarWarsApi("people").then(response=>response.results);
export const fetchPlanets = () => fetchStarWarsApi("planets").then(response=>response.results);