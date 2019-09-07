import React, { Component } from "react";
import logo from "./logo.svg";
import "./Generator.css";
import plots from "./plots";

let swapiPeople = {
  0: ["Luke Skywalker", "male"],
  1: ["R2-D2", "n/a"]
}; //is an object of arrays containing name and gender properties
let swapiPlanets = ["Tattoine", "Hoth"]; //is an array of name properties

//function Generator() {
class Generator extends Component {
  state = {
  	plotText: replacePlaceholders(plots[0])
  }

  onClickButton = () => {
	this.setState({
		plotText: generatePlot(plots)
	})
  }

  render() {
    return (
      <div className="Generator">
        <button onClick={this.onClickButton}>Generate Plot</button>
        <p>{this.state.plotText}</p>
      </div>
    );
  }
}

//ToDo: Get SWAPI data and put it into the global variables swapiPeople and swapiPlanets
function fetchPlaceholders() {
  return true;
}

function generatePlot(plots) {
  let plot = randomizePlot(plots);
  return replacePlaceholders(plot);
}

//Optional: Replace pronouns depending on gender (would need to insert pronoun-placeholders into texts first)
function replacePlaceholders(plot) {
  //ToDo: fetchPlaceholders()
  let personA = randomizeElement("person");
  let personB = randomizeElement("person");
  while (personA === personB) {
    personB = randomizeElement("person");
  }
  let planetA = randomizeElement("planet");

  return plot
    .replace(/:personA:/g, personA)
    .replace(/:personB:/g, personB)
    .replace(/:planetA:/g, planetA);
}

//Returns the name property of the element
function randomizeElement(type) {
  if (type === "person") {
    let swapiPeopleKeys = Object.keys(swapiPeople);
    let randomPeopleKey = swapiPeopleKeys[randomIntFromInterval(0, swapiPeopleKeys.length - 1)];
    return swapiPeople[randomPeopleKey][0];

  } else if (type === "planet") {
    let randomPlanet = swapiPlanets[randomIntFromInterval(0, swapiPlanets.length - 1)];
    return randomPlanet;
  }
}

function randomizePlot(plots) {
  return plots[randomIntFromInterval(0, plots.length - 1)];
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default Generator;