import React, {Component} from 'react';
import axios from 'axios';

// components for ROOM tab
// form for wall
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
		event.preventDefault();
		if (this.props.editing) {
			axios.post("http://localhost:3001/api/updateData", {
				id: this.prop._id,
				update: {x1: this.state.x1ToEdit,
					y1: this.state.y1ToEdit,
					x2: this.state.x2ToEdit,
					y2: this.state.y2ToEdit,
					build: this.state.buildToEdit}
			});
		}
		else {
			alert("Submitted");
			axios.post("http://localhost:3001/api/putDataRoom", {
				x1: this.state.x1ToEdit,
				y1: this.state.y1ToEdit,
				x2: this.state.x2ToEdit,
				y2: this.state.y2ToEdit,
				build: this.state.buildToEdit
			});
		}
		this.setState({showForm: false})
	};

	handleButton() {
		console.log("Button was: ", this.showForm);
		this.setState({showForm: !this.showForm});
		console.log("Button is now: ", this.showForm);
	}

	render() {
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
		else if (this.props.editing) {
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

// listing component for walls in room tab
function WallList(props) {
	return (
		<div>
			{this.props.walls.length <= 0 ? "NO WALLS YET" : this.props.walls.map((wall) => (
				<li style={{padding: "10px"}} key={wall._id}>
					<span style={{color: "gray"}}> id: </span> {wall._id} <br />
					<span style={{color: "gray"}}> x1: </span> {wall.x1} <br />
					<span style={{color: "gray"}}> y1: </span> {wall.y1} <br />
					<span style={{color: "gray"}}> x2: </span> {wall.x2} <br />
					<span style={{color: "gray"}}> y2: </span> {wall.y2} <br />
					<span style={{color: "gray"}}> build: </span> {wall.build} <br />

					<button onClick={() => this.props.del(wall._id)}>
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
	);
}

// Components for FURNITURE Tab
// form for furniture
class WallForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			x1ToEdit: props.x1,
			y1ToEdit: props.y1,
			x2ToEdit: props.x2,
			y2ToEdit: props.y2,
			x3ToEdit: props.x3,
			y3ToEdit: props.y3,
			x4ToEdit: props.x4,
			y4ToEdit: props.y4,
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
		event.preventDefault();
		if (this.props.editing) {
			axios.post("http://localhost:3001/api/updateData", {
				id: this.prop._id,
				update: {
					x1: this.state.x1ToEdit,
					y1: this.state.y1ToEdit,
					x2: this.state.x2ToEdit,
					y2: this.state.y2ToEdit,
					x3: this.state.x3ToEdit,
					y3: this.state.y3ToEdit,
					x4: this.state.x4ToEdit,
					y4: this.state.y4ToEdit
				}
			});
		}
		else {
			alert("Submitted");
			axios.post("http://localhost:3001/api/putDataFurniture", {
				x1: this.state.x1ToEdit,
				y1: this.state.y1ToEdit,
				x2: this.state.x2ToEdit,
				y2: this.state.y2ToEdit,
				x3: this.state.x3ToEdit,
				y3: this.state.y3ToEdit,
				x4: this.state.x4ToEdit,
				y4: this.state.y4ToEdit
			});
		}
		this.setState({showForm: false})
	};

	handleButton() {
		console.log("Button was: ", this.showForm);
		this.setState({showForm: !this.showForm});
		console.log("Button is now: ", this.showForm);
	}

	render() {
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

					<input
						name="x3ToEdit"
						type="number"
						value={this.state.start}
						onChange={this.handleChange}
						placeholder="Ex: 0"
						style={{width: "200px"}}
					/> <br />

					<input
						name="y3ToEdit"
						type="number"
						value={this.state.start}
						onChange={this.handleChange}
						placeholder="Ex: 0"
						style={{width: "200px"}}
					/> <br />

					<input
						name="x4ToEdit"
						type="number"
						value={this.state.start}
						onChange={this.handleChange}
						placeholder="Ex: 0"
						style={{width: "200px"}}
					/> <br />

					<input
						name="y4ToEdit"
						type="number"
						value={this.state.start}
						onChange={this.handleChange}
						placeholder="Ex: 0"
						style={{width: "200px"}}
					/> <br />

					<input type="submit" value="Submit" />
				</form>
			);
		}
		else if (this.props.editing) {
			return (
				<button onClick={this.handleButton}>Edit</button>
			);
		}
		else {
			return (
				<button onClick={this.handleButton}>Add Furniture</button>
			);
		}
	}
}


// listing component for furniture tab
function FurnList(props) {
	return (
		<div>
			{this.props.furniture.length <= 0 ? "NO ITEMS YET" : this.props.furniture.map((item) => (
				<li style = {{padding: "10px"}} key=item._id}>
					<span style={{color: "gray"}}> id: </span> {item._id} <br />
					<span style={{color: "gray"}}> x1: </span> {item.x1} <br />
					<span style={{color: "gray"}}> y1: </span> {item.y1} <br />
					<span style={{color: "gray"}}> x2: </span> {item.x2} <br />
					<span style={{color: "gray"}}> y2: </span> {item.y2} <br />
					<span style={{color: "gray"}}> x3: </span> {item.x3} <br />
					<span style={{color: "gray"}}> y3: </span> {item.y3} <br />
					<span style={{color: "gray"}}> x4: </span> {item.x4} <br />
					<span style={{color: "gray"}}> y4: </span> {item.y4} <br />

					<button onClick={() => this.props.del(item._id)}>
						DELETE
					</button>

					<FurnForm editing={true}/>
				</li>
			))}
			<br />
			<FurnForm
				x1={0}
				y1={0}
				x2={30}
				y2={0}
				x3={30}
				y3={30}
				x4={0}
				y4={30}
			/>
		</div>
	);
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