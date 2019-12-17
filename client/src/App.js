import React, { Component } from 'react';
import axios from 'axios';
// import { render } from "react-dom";

import WallList from "./components/room"
import FurnList from "./components/furniture"
//import CreateUser from "./components/create-user.component";

class App extends Component {
	constructor(props) {
		super(props);
	  this.state = {
	  	walls: [],
	    furniture: []
	  };
		this.getDataRoom = this.getDataRoom.bind(this);
		this.deleteDataRoom = this.deleteDataRoom.bind(this);
		this.getDataFurniture = this.getDataFurniture.bind(this);
		this.deleteDataFurniture = this.deleteDataFurniture.bind(this);
	}

  // fetch all existing data in db and incorporate polling logic to see
  // if db has changed and implement changes into UI
  componentDidMount() {
    this.getDataRoom();
    this.getDataFurniture();
    // if (!this.state.intervalIsSet) {
    //   let interval = setInterval(this.getDataFromDb, 1000);
    //   this.setState({intervalIsSet: interval});
    // }
  };

  // kill process after done using
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  };

  // get method for room's walls
  getDataRoom() {
  	axios.get("http://localhost:3001/room/getData")
  		.then(res => {
  			this.setState({walls: res.data})
  		})
  		.catch((error) => {
  			console.log(error.data);
  		});
  };

  // delete method for room's walls
  deleteDataRoom(idToDelete) {
  	// remove from database
    axios.delete("http://localhost:3001/room/deleteData", {
      data: {
        id: idToDelete
      }
    })
    	.then(res => console.log(res.data))
    	.catch((error) => console.log(error.data));

    // remove from component
    this.setState({
    	walls: this.state.walls.filter(wall => wall._id !== idToDelete)
    })
  };

  // get method for furniture's walls
	getDataFurniture() {
		axios.get("http://localhost:3001/furniture/getData")
			.then(res => {
				this.setState({furniture: res.data})
			})
			.catch((error) => {
				console.log(error.data);
			});
	};

	// delete method for furniture's walls
	deleteDataFurniture(idToDelete) {
		// remove from database
		axios.delete("http://localhost:3001/furniture/deleteData", {
			data: {
				id: idToDelete
			}
		})
		.then(res => console.log(res.data))
		.catch((error) => console.log(error.data));

		// remove from component
		this.setState({
			furniture: this.state.furniture.filter(piece => piece._id !== idToDelete)
		})
	};

  // Components should be Capitalized
  // Events should use camelCase
  // UI using JSX
  render() {
    return (
      <div>
      	
      	<WallList
      		data={this.state.walls}
      		getData={this.getDataRoom}
      		deleteData={this.deleteDataRoom}
      	/>
      	<FurnList
    			data={this.state.furniture}
    			getData={this.getDataFurniture}
    			deleteData={this.deleteDataFurniture}
    		/>
      </div>
    );
  }
}

export default App;