import React, {Component} from 'react';
import axios from 'axios';

class EditForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			startx: 0,
			starty: 0,
			length: 50,
			build: 1,
			direct: 3
		};
	}

	handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({[name]: value});
	}

	handleSubmit(event) {

	}

	// Add

	render() {
		return (
			<form style={{padding: "10px"}} onSubmit={this.handleSubmit}>

				{// start x
				}
				<input
					name="startx"
					type="number"
					value={this.state.start}
					onChange={this.handleChange}
					placeholder="Ex: 0"
					style={{width: "200px"}}
				/> <br />

				{// start y
				}
				<input
					name="starty"
					type="number"
					value={this.state.start}
					onChange={this.handleChange}
					placeholder="Ex: 0"
					style={{width: "200px"}}
				/> <br />

				{// length
				}
				<input
						name="length"
						type="number"
						value={this.state.start}
						onChange={this.handleChange}
						placeholder="Ex: 0"
						style={{width: "200px"}}
				/> <br />

				{// build 1-wall, 2-window, 3-door
				}
				<select value={this.state.value} onChange={this.handleChange}>
					<option name="build" value={1}>Wall</option>
					<option name="build" value={2}>Window</option>
					<option name="build" value={3}>Door</option>
				</select> <br />

				{// direction 1-down, 2-right, 3-up, 4-left
				}
				<select value={this.state.value} onChange={this.handleChange}>
					<option name="direct" value={3}>Up</option>
					<option name="direct" value={1}>Down</option>
					<option name="direct" value={2}>Right</option>
					<option name="direct" value={4}>Left</option>
				</select> <br />

				{// submit form
				}
				<input type="submit" value="Submit" />

			</form>
		);
	}
}

// TODO: change to class component
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
						<span style={{color: "gray"}}> id: </span> {wall.id} <br />
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

					</li>
				))}
				<EditForm />
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
        {// Room Tab

      	// Wall List
      }
      	<WallList walls={this.state.room} del={this.deleteFromDB} />
        

        {// Add
        }
        <div style={{padding: "10px"}}>
          <input
            type="text"
            onChange={e => this.setState({message: e.target.value})}
            placeholder="add something in the database"
            style={{width: "200px"}}
          />
          <button onClick={() => this.putDataToDB(this.state.message)}>
            ADD
          </button>
        </div>

        {// Delete
        }
        <div style={{padding: "10px"}}>
          <input
            type="text"
            style={{width: "200px"}}
            onChange={e => this.setState({idToDelete: e.target.value})}
            placeholder="put id of item to delete here"
          />
          <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
            DELETE
          </button>
        </div>

        {// Update
        }
        <div style={{padding: "10px"}}>
          <input
            type="text"
            style={{width: "200px"}}
            onChange={e => this.setState({idToUpdate: e.target.value})}
            placeholder="id of item to update here"
          />
          <input
            type="text"
            style={{width: "200px"}}
            onChange={e => this.setState({updateToApply: e.target.value})}
            placeholder="put new value of the item here"
          />
          <button
            onClick={() =>
              this.updateDB(this.state.idToUpdate, this.state.updateToApply)
            }
          >
            UPDATE
          </button>
        </div>
      </div>
    );
  }
}

export default App;
