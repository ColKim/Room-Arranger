import React, { Component } from 'react';
import axios from 'axios';

import 

class App extends Component {
  state = {
  	// old app
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
    // wall state
    room: [],
    furniture: [],

  };

  // fetch all existing data in db and incorporate polling logic to see
  // if db has changed and implement changes into UI
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({intervalIsSet: interval});
    }
  }

  // kill process after done using
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // TODO:
  // get
  // put
  // update delete

  // TODO
  // get method
  getRoomFromDB = () => {
    fetch("http://localhost:3001/room/getData")
      .then(data => data.json())
      .then(res => this.setState({data: res.data}));
  };

  // TODO delete
  // put method delete
  putDataToDB = message => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }
    //const {id, walls, type} = req.body;
    axios.post("http://localhost:3001/api/putData", { 
      id: idToBeAdded,
      message: message,
    });
  };

  // delete method
  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id === parseInt(idTodelete)) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete("http://localhost:3001/api/deleteData", {
      data: {
        id: objIdToDelete
      }
    });
  };

  // TODO delete 
  // update data
  updateDB = (idToupdate, updateToApply) => {
    let objIdToUpdate = null;
    this.state.data.forEach((dat) => {
      if (dat.id === parseInt(idToupdate)) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post("http://localhost:3001/api/updateData", {
      id: objIdToUpdate,
      update: {message: updateToApply}
    });
  };


  // Components should be Capitalized
  // Events should use camelCase
  // UI using JSX
  render() {
    const {data} = this.state;
    return (
      <div>
      	{
      		// Room Tab
      	}
      	<WallList 
      		walls={this.state.room} 
      		del={this.deleteFromDB}
    		/>
    		<FurnList 
    			furniture={this.state.furniture}
    			del={this.deleteFromDB}
    		/>
      </div>
    );
  }
}

export default App;