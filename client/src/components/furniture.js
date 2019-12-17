import React from 'react';
import axios from 'axios';

// form
class FurnForm extends React.Component {
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
		const value = parseInt(event.target.value);
		this.setState({[name]: value});
	};

	handleSubmit(event) {
		event.preventDefault();
		if (this.props.editing) {
			axios.post("http://localhost:3001/furniture/updateData", {
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
			})
			.then(res => {
				console.log(res.data);
				console.log("Furniture Updated")
				this.props.refresh();
			})
			.catch((error) => {
				console.log(error.data);
			});
		}
		else {
			axios.post("http://localhost:3001/furniture/putData", {
				x1: this.state.x1ToEdit,
				y1: this.state.y1ToEdit,
				x2: this.state.x2ToEdit,
				y2: this.state.y2ToEdit,
				x3: this.state.x3ToEdit,
				y3: this.state.y3ToEdit,
				x4: this.state.x4ToEdit,
				y4: this.state.y4ToEdit
			})
			.then(res => {
				console.log(res.data);
				this.props.refresh();
			})
			.catch((error) => {
				console.log(error.data);
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
// class FurnList extends React.Component {
export default class FurnList extends React.Component{
	render() {
		return (
				<div>
					{this.props.data.length <= 0 ? "NO ITEMS YET" : this.props.data.map((item) => (
						<li style = {{padding: "10px"}} key={item._id}>
							<span style={{color: "gray"}}> id: </span> {item._id} <br />
							<span style={{color: "gray"}}> x1: </span> {item.x1} <br />
							<span style={{color: "gray"}}> y1: </span> {item.y1} <br />
							<span style={{color: "gray"}}> x2: </span> {item.x2} <br />
							<span style={{color: "gray"}}> y2: </span> {item.y2} <br />
							<span style={{color: "gray"}}> x3: </span> {item.x3} <br />
							<span style={{color: "gray"}}> y3: </span> {item.y3} <br />
							<span style={{color: "gray"}}> x4: </span> {item.x4} <br />
							<span style={{color: "gray"}}> y4: </span> {item.y4} <br />
		
							<button onClick={() => this.props.deleteData(item._id)}>
								DELETE
							</button>
		
							<FurnForm 
								x1={item.x1}
								y1={item.y1}
								x2={item.x2}
								y2={item.y2}
								x3={item.x3}
								y3={item.y3}
								x4={item.x4}
								y4={item.y4}
								editing={true}
								id={item._id}
								refresh={this.props.getData}
							/>
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
						editing={false}
						refresh={this.props.getData}
					/>
				</div>
			);
	}
}