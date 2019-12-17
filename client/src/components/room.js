import React from 'react';
import axios from 'axios';

// form
class WallForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			x1ToEdit: props.x1,
			y1ToEdit: props.y1,
			x2ToEdit: props.x2,
			y2ToEdit: props.y2,
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
			axios.post("http://localhost:3001/room/updateData", {
				id: this.prop.id,
				update: {x1: this.state.x1ToEdit,
					y1: this.state.y1ToEdit,
					x2: this.state.x2ToEdit,
					y2: this.state.y2ToEdit,
					build: this.state.buildToEdit}
			})
			.then(res => {
				console.log(res.data);
				this.props.refresh();
			})
			.catch((error) => {
				console.log(error.data);
			});
		}
		else {
			alert("Submitted");
			axios.post("http://localhost:3001/room/putData", {
				x1: this.state.x1ToEdit,
				y1: this.state.y1ToEdit,
				x2: this.state.x2ToEdit,
				y2: this.state.y2ToEdit,
				build: this.state.buildToEdit
			})
			.then(res => {
				console.log(res.data);
				this.props.refresh();
			})
			.catch((error) => {
				console.log(error.data);
				// TODO: notify user of error
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
// class WallList extends React.Component {
export default class WallList extends React.Component{
	render () {
		return (
			<div>
				{this.props.data.length <= 0 ? "NO WALLS YET" : this.props.data.map((wall) => (
					<li style={{padding: "10px"}} key={wall._id}>
						<span style={{color: "gray"}}> id: </span> {wall._id} <br />
						<span style={{color: "gray"}}> x1: </span> {wall.x1} <br />
						<span style={{color: "gray"}}> y1: </span> {wall.y1} <br />
						<span style={{color: "gray"}}> x2: </span> {wall.x2} <br />
						<span style={{color: "gray"}}> y2: </span> {wall.y2} <br />
						<span style={{color: "gray"}}> build: </span> {wall.build} <br />

						<button onClick={() => this.deleteFromDB(wall._id)}>
							DELETE
						</button>
						
						<WallForm
							x1={wall.x1}
							y1={wall.y1}
							x2={wall.x2}
							y2={wall.y2}
							build={wall.build}
							editing={true}
							id={wall._id}
							refresh={this.getRoomFromDB}
						/>
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
}