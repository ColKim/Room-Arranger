import React, {Component} from 'react';
import axios from 'axios';

class WallForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			x1ToEdit: props.startx,
			y1ToEdit: props.starty,
			x2ToEdit: props.endx,
			y2ToEdit: props.endy,
			buildToEdit: props.build,
			showForm: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleButton = this.handleButton.bind(this);
	}

	handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({[name]: value});
	};

	handleSubmit(event) {
		// alert("handleSubmit called");
		event.preventDefault();
		// this.setState({showForm: !this.showForm});
		if (this.props.editing) {
			// axios.post("http://localhost:3001/api/updateData", {
			// 	id: this.prop._id,
			// 	x1: this.state.x1ToEdit,
			// 	y1: this.state.y1ToEdit,
			// 	x2: this.state.x2ToEdit,
			// 	y2: this.state.y2ToEdit,
			// 	build: this.state.buildToEdit
			// });
		}
		else {
			// alert("Submitted");
			// axios.post("http://localhost:3001/api/putData", {
			// 	x1: this.state.x1ToEdit,
			// 	y1: this.state.y1ToEdit,
			// 	x2: this.state.x2ToEdit,
			// 	y2: this.state.y2ToEdit,
			// 	build: this.state.buildToEdit
			// });
		}
		this.setState({showForm: false})
	};

	handleButton() {
		console.log("Button was: ", this.showForm);
		this.setState({showForm: !this.showForm});
		console.log("Button is now: ", this.showForm);
	}

	render() {
		// alert("rendered");
		if (this.state.showForm) {
			return (
				<form style={{padding: "10px"}} onSubmit={this.handleSubmit}>
					<input
						name="x1ToEdit"
						type="number"
						value={this.state.start}
						onChange={this.handleChange}
						placeholder="Ex: 0"
						style={{width: "200px"}}
					/> <br />

					<input
						name="y1ToEdit"
						type="number"
						value={this.state.start}
						onChange={this.handleChange}
						placeholder="Ex: 0"
						style={{width: "200px"}}
					/> <br />

					<input
						name="x2ToEdit"
						type="number"
						value={this.state.start}
						onChange={this.handleChange}
						placeholder="Ex: 0"
						style={{width: "200px"}}
					/> <br />

					<input
						name="y2ToEdit"
						type="number"
						value={this.state.start}
						onChange={this.handleChange}
						placeholder="Ex: 0"
						style={{width: "200px"}}
					/> <br />

					<select value={this.state.value} onChange={this.handleChange}>
						<option name="buildToEdit" value={1}>Wall</option>
						<option name="buildToEdit" value={2}>Window</option>
						<option name="buildToEdit" value={3}>Door</option>
					</select> <br />

					<input type="submit" value="Submit" />
				</form>
			);
		}
		else if (this.editing) {
			return (
				<button onClick={this.handleButton}>Edit</button>
			);
		}
		else {
			return (
				<button onClick={this.handleButton}>Add Wall</button>
			);
		}
	}
}

class WallList extends React.Component{
	constructor(props){
		super(props);
		this.state = {

		};
	}

	render() {
		return (
			<div>
				{this.props.walls.length <= 0 ? "NO ENTRIES YET" : this.props.walls.map((wall) => (
					<li style={{padding: "10px"}} key={wall.id}>
						<span style={{color: "gray"}}> id: </span> {wall._id} <br />
						<span style={{color: "gray"}}> x1: </span> {wall.x1} <br />
						<span style={{color: "gray"}}> y1: </span> {wall.y1} <br />
						<span style={{color: "gray"}}> x2: </span> {wall.x2} <br />
						<span style={{color: "gray"}}> y2: </span> {wall.y2} <br />
						<span style={{color: "gray"}}> build: </span> {wall.build} <br />

						{// DELETE BUTTON
						}
						<button onClick={() => this.props.del(wall.id)}>
							DELETE
						</button>
						
						<WallForm editing={true}/>

					</li>
				))}
				<br />
				<WallForm 
					x1={0}
					y1={0}
					x2={0}
					y2={50}
					build={1}
					editing={false}
				/>
	    </div>
		)
	}
}


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

  // TODO
  // get method
  getDataFromDb = () => {
    fetch("http://localhost:3001/api/getData")
      .then(data => data.json())
      .then(res => this.setState({data: res.data}));
  };

  // TODO
  // put method
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

  // 

  // TODO
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

  // TODO
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
      </div>
    );
  }
}

export default App;


        // {// Add
        // }
        // <div style={{padding: "10px"}}>
        //   <input
        //     type="text"
        //     onChange={e => this.setState({message: e.target.value})}
        //     placeholder="add something in the database"
        //     style={{width: "200px"}}
        //   />
        //   <button onClick={() => this.putDataToDB(this.state.message)}>
        //     ADD
        //   </button>
        // </div>
        // {// Delete
        // }
        // <div style={{padding: "10px"}}>
        //   <input
        //     type="text"
        //     style={{width: "200px"}}
        //     onChange={e => this.setState({idToDelete: e.target.value})}
        //     placeholder="put id of item to delete here"
        //   />
        //   <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
        //     DELETE
        //   </button>
        // </div>
        // {// Update
        // }
        // <div style={{padding: "10px"}}>
        //   <input
        //     type="text"
        //     style={{width: "200px"}}
        //     onChange={e => this.setState({idToUpdate: e.target.value})}
        //     placeholder="id of item to update here"
        //   />
        //   <input
        //     type="text"
        //     style={{width: "200px"}}
        //     onChange={e => this.setState({updateToApply: e.target.value})}
        //     placeholder="put new value of the item here"
        //   />
        //   <button
        //     onClick={() =>
        //       this.updateDB(this.state.idToUpdate, this.state.updateToApply)
        //     }
        //   >
        //     UPDATE
        //   </button>
        // </div>