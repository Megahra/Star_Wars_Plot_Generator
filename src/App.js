import React, { Component } from "react";
import Generator from './Generator';
import NavigationBar from './NavigationBar';
import { 
	Container,
	Row,
	Col } from 'reactstrap';
import "./App.css";
import logo from './img/logo.png';
import arrow from './img/arrowDown.png';


class App extends Component {
	
	constructor(props){
	    super(props);
	    this.state = {

    	}
	}

	render() {
	    return (
	    	<div className="App">
	    		<NavigationBar />
		    	<Container fluid>
		    		<Row className="pageHead text-center align-items-center">
	    				<Col>
	    					<img id="logo" src={logo} alt="Star Wars Plot Generator Logo"/>
			    			<h1 className="teaserText">A long time ago in a galaxy far, far away....</h1>
			    			<p><img id="logo" src={arrow} alt=""/></p>
		    			</Col>
		    		</Row>
		    		<Row className="pageContent">
		    			<Col>
		    				<Generator />
	    				</Col>
		    		</Row>
		    		<Row className="pageFooter text-center">
		    			<Col>
		    				<p>&copy; 2019 REBECCA WÖLFLE using the <a href="https://https://swapi.co/">Star Wars API</a>.</p>
	    				</Col>
		    		</Row>
		    	</Container>
	    	</div>
    	);
	}
}

export default App;