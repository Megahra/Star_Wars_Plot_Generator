import React, { Component } from "react";
import "./Generator.css";
import plots from "./plots";
import {titles, wildcards} from "./titles.js";
import {fetchPeople, fetchPlanets, searchPeople, searchPlanets} from "./lib/starWarsApi.js";
import { Button } from 'reactstrap';

class Generator extends Component {
	
	constructor(props){
	    super(props);
	    this.state = {
			people: [ 
		  		{
		  			"name": "Leia Organa", 
		  		 	"gender": "female"
		  		},
		  		{
		  			"name": "Lando Calrissian", 
		  		 	"gender": "male"
		  		}
		  	], 
			planets: [
				{
					"name": "Tattoine"
				},
				{
					"name": "Hoth"
				}
			], 
			plotTitle: "",
			plotText: "",
			personA: "",
			personB: "",
			planetA: "",
			plotResources: "",
			searchInput: "name"
		};
		this.handleChange = this.handleChange.bind(this);
    	this.onClickSearchButton = this.onClickSearchButton.bind(this);
	}

	onClickButton = () => {
		const plotElements = randomizePlotElements(plots, this.state.people.map(a => a.name), this.state.planets.map(a => a.name));

		this.setState({
			plotTitle: randomizeTitle(titles, wildcards),
			personA: plotElements.personA,
			personB: plotElements.personB,
			planetA: plotElements.planetA,			
			plotText: generatePlot(plotElements.plot, plotElements.personA, plotElements.personB, plotElements.planetA),
			plotResources: buildResourcesHtml(plotElements.personA, plotElements.personB, plotElements.planetA)
		})
	}

	handleChange(event) {
		this.setState({searchInput: event.target.value})
	}

	onClickSearchButton = () => {
		searchPeople(this.state.searchInput)
        .then(people=> console.log(people));
	}

	getData(){
    	fetchPeople()
        .then(people=>this.setState({people}));
      
    	fetchPlanets()
    	.then(planets=>{
    		this.setState({planets});
    		console.log("Ready!");
    	});
	}

	componentDidMount(){
    	this.getData();
	}

	render() {
	    return (
	      <div className="Generator">
	        <button onClick={this.onClickButton}>Generate New Plot</button>
	        <h1>{this.state.plotTitle}</h1>
	        <p dangerouslySetInnerHTML={{__html: this.state.plotText}}></p> 
	        <div>{this.state.plotResources}
	        </div>
	        <input id="searchinput" type="text" value={this.state.searchInput} onChange={this.handleChange}/>
	        <button onClick={this.onClickSearchButton}>Search</button>
	      </div>
	    );
	}
}

function buildResourcesHtml(personA, personB, planetA) {
	return ( //Add URLs <a href={getUrl(personA, "people")}> and seach bar: , Replace by:<input id="userinput" type="text" placeholder="name"><button onClick={this.onClickSearchButton}>Search</button>
		<div>
			<p>List of resources:</p>
	        	<ul>
	        		<li>Person: {personA}</li>
	        		<li>Person: {personB}</li>
	        		<li>Planet: {planetA}</li>
	        	</ul>
    	</div>
		);
}

function getUrl(name, stateVariable) {
	//search Array for the object with the right name value and return it's url property
	/*return search(name, stateVariable).url;*/
}

function search(nameValue, myArray){
    for (let i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameValue) {
            return myArray[i];
        }
    }
}

function randomizeTitle(titles, wildcards) {
	return randomizeElement(titles)
		.replace(/:wildcards:/g, randomizeElement(wildcards));
}

function randomizePlotElements(plots, peopleNames, planetNames) {
	const plotElements = {};

	plotElements["plot"] = randomizeElement(plots);
	plotElements["planetA"] = randomizeElement(planetNames);
	plotElements["personA"] = randomizeElement(peopleNames);

	let personB = randomizeElement(peopleNames);
	while (plotElements.personA === personB) {
		personB = randomizeElement(peopleNames);
	}
	plotElements["personB"] = personB;

	return plotElements;
}

function generatePlot(plot, personA, personB, planetA) {
	return plot
		.replace(/:personA:/g, "<span className='changeable person' id='personA'>" + personA + "</span>")
		.replace(/:personB:/g, "<span className='changeable person' id='personB'>" + personB + "</span>")
		.replace(/:planetA:/g, "<span className='changeable planet' id='planetA'>" + planetA + "</span>");
}

function randomizeElement(array) {
	return array[randomIntFromInterval(0, array.length - 1)]
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default Generator;