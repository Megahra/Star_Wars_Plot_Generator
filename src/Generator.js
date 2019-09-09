import React, { Component } from "react";
import "./Generator.css";
import plots from "./plots";
import {fetchPeople, fetchPlanets} from "./lib/starWarsApi.js";

class Generator extends Component {
	
	constructor(props){
	    super(props);
	    this.state = {
			people: [ 
		  		{
		  			"name": "Luke Skywalker", 
		  		 	"gender": "male"
		  		},
		  		{
		  			"name": "R2-D2", 
		  		 	"gender": "n/a"
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
			planetA: ""
		}
	}

	onClickButton = () => {
		this.setState({
			plotText: generatePlot(plots, 
				this.state.people.map(a => a.name), 
				this.state.planets.map(a => a.name))
		})
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
	        <p>{this.state.plotText}</p>
	        <div>
	        	<p>List of resources:</p>
	        	<ul>
	        		<li></li>
	        	</ul>
	        </div>
	      </div>
	    );
	}
}

function generatePlot(plots, peopleNames, planetNames) {
  let plot = randomizeElement(plots);
  return replacePlaceholders(plot, peopleNames, planetNames);
}

//Optional: Replace pronouns depending on gender (would need to insert pronoun-placeholders into texts first)
function replacePlaceholders(plot, peopleNames, planetNames) {
  //ToDo: fetchPlaceholders()
  let personA = randomizeElement(peopleNames);
  let personB = randomizeElement(peopleNames);
  while (personA === personB) {
    personB = randomizeElement(peopleNames);
  }
  let planetA = randomizeElement(planetNames);

  return plot
    .replace(/:personA:/g, personA)
    .replace(/:personB:/g, personB)
    .replace(/:planetA:/g, planetA);
}

function randomizeElement(array) {
	return array[randomIntFromInterval(0, array.length - 1)]
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default Generator;