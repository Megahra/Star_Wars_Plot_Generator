import React, { Component } from "react";
import { 
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink } from 'reactstrap';

class NavigationBar extends Component {
	
	constructor(props){
	    super(props);
	    this.state = {
	    	isOpen: false
    	};
    	this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
	    return (
	    	<div className="Navbar">
	    		<Navbar color="dark" dark expand="md">
          			<NavbarBrand id="appName" href="/">Star Wars Plot Generator</NavbarBrand>
          			<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
	          			<Nav className="ml-auto" navbar>
	          				<NavItem>
								<NavLink href="https://github.com/Megahra/Star_Wars_Plot_Generator">GitHub</NavLink>
							</NavItem>
	          			</Nav>
          			</Collapse>
      			</Navbar>
	    	</div>
    	);
	}
}

export default NavigationBar;