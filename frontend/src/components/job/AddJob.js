import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Select from "react-select";
import ls from "local-storage";
import DateTimePicker from 'react-datetime-picker'
import TextField from '@material-ui/core/TextField';

class AddJob extends Component {
	constructor() {
		super();
		this.state = {
			title: "",
			num_app: "",
			selectedOption: "",
			jobtype: "",
			recname: "",
			recmail: "",
			position: "",
			pos_left: "",
			duration: "",
			salary: "",
			year: "",
			month: "",
			day: "",
			hour: "",
			minute: "",
			time: new Date(),
			errors: {}
		};
		this.jobtype = [
			{ label: "Full-time", value: "Full-time" },
			{ label: "Part-time", value: "Part-time" },
			{ label: "Work-from-home", value: "Work-from-home" }
		];
	}
	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		const newJob = {
			title: this.state.title,
			num_app: this.state.num_app,
			position: this.state.position,
			jobtype: this.state.selectedOption.value,
			pos_left: this.state.position,
			duration: this.state.duration,
			salary: this.state.salary,
			year: this.state.year,
			month: this.state.month,
			day: this.state.day,
			hour: this.state.hour,
			minute: this.state.minute,
			time : this.state.time,
			recmail: ls.get("email"),
			recname: ls.get("username")
		};
		console.log(newJob);
		axios
			.post('http://localhost:4000/job/create', newJob)
			.then(function (res) {
				alert("Job Added Successfully");
				console.log(newJob);
				window.location.reload();
			})
			.catch(function (res) {
				alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
	};
	handleChange = selectedOption => {
		this.setState({ selectedOption });
		console.log(`Option selected:`, selectedOption);
	};
	render() {
		const { errors } = this.state;
		const { selectedOption } = this.state;
		return (
			<div className="container">
				<div className="row">
					<div className="col s8 offset-s2">
						<Link to="/" className="btn-flat waves-effect">
							<i className="material-icons left">
								keyboard_backspace
							</i>{" "}
							Back to home
						</Link>
						<div
							className="col s12"
							style={{ paddingLeft: "11.250px" }}
						>
							<h4>
								<b>Add Job</b>
							</h4>
						</div>
						<form noValidate onSubmit={this.onSubmit}>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.title}
									error={errors.title}
									id="title"
									type="text"
								/>
								<label htmlFor="title">Job title</label>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.num_app}
									error={errors.num_app}
									id="num_app"
									type="text"
								/>
								<label htmlFor="num_app">Number of Applicants</label>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.position}
									error={errors.position}
									id="position"
									type="text"
								/>
								<label htmlFor="position">Positions</label>
							</div>
							<div className="input-field col s12">
								<Select
									onChange={this.handleChange}
									value={selectedOption}
									options={this.jobtype}
									id="jobtype"
									placeholder="jobtype"
								/>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.duration}
									error={errors.duration}
									id="duration"
									type="text"
								/>
								<label htmlFor="duration">Job duration (in months)</label>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.salary}
									error={errors.salary}
									id="salary"
									type="text"
								/>
								<label htmlFor="salary">salary</label>
							</div>
							<TextField
								id="time"
								label="Deadline"
								type="datetime-local"
								value={this.state.time}
								onChange={this.onChange}
								InputLabelProps={{
									shrink: true,
								  }}
							/>
							<div
								className="col s12"
								style={{ paddingLeft: "11.250px" }}
							>
								<button
									style={{
										width: "150px",
										borderRadius: "3px",
										letterSpacing: "1.5px",
										marginTop: "1rem"
									}}
									type="submit"
									className="btn btn-large waves-effect waves-light hoverable blue accent-3"
								>
									Add Job
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default AddJob;
