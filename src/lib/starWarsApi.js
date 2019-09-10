import {fetchJSON} from "./dataAccess";

const baseApiUrl = "https://swapi.co/api/";
const wrapSearchTerm = searchTerm => "/?search=" + searchTerm;

const fetchStarWarsApi = (resource, searchParam = "") => fetchJSON(baseApiUrl + resource + searchParam);

export const fetchPeople = () => fetchStarWarsApi("people",);
export const fetchPlanets = () => fetchStarWarsApi("planets",);

export const searchPeople = searchTerm => fetchStarWarsApi("people", wrapSearchTerm(searchTerm));
export const searchPlanets = searchTerm => fetchStarWarsApi("planets", wrapSearchTerm(searchTerm));

