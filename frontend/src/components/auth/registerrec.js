import React, { Component } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import axios from "axios";

class Register extends Component {
	constructor() {
		super();
		this.state = {
			name: "",
			email: "",
			password: "",
			password2: "",
            usertype: "",
            contact: "",
            bio:"",
			errors: {},
			selectedOption: ""
		};
	}
	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};
	onSubmit = e => {
		e.preventDefault();
		// this.usertype = this.state.selectedOption.value;
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2,
            usertype: "recruiter",
            contact : this.state.contact,
            bio : this.state.bio
		};
		console.log(newUser);
		axios
			.post('http://localhost:4000/user/register/recruit/', newUser)
			.then(function(res) {
				alert("Registered Successfully");
				window.location.reload();
			})
			.catch(function(res) {
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
								<b>Register</b> below as recruiter
							</h4>
							<p className="grey-text text-darken-1">
								Already have an account?{" "}
								<Link to="/login">Log in</Link>
							</p>
						</div>
						<form noValidate onSubmit={this.onSubmit}>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.name}
									error={errors.name}
									id="name"
									type="text"
								/>
								<label htmlFor="name">Name*</label>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.email}
									error={errors.email}
									id="email"
									type="email"
								/>
								<label htmlFor="email">Email*</label>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.password}
									error={errors.password}
									id="password"
									type="password"
								/>
								<label htmlFor="password">Password*</label>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.password2}
									error={errors.password2}
									id="password2"
									type="password"
								/>
								<label htmlFor="password2">
									Confirm Password*
								</label>
							</div>
                            <div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.contact}
									error={errors.contact}
                                    id="contact"
                                    data-length =  "10"
									type="text"
								/>
								<label htmlFor="contact">Contact*</label>
							</div>
                            <div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.bio}
									error={errors.bio}
									id="bio"
									maxlength = "250"
									type="text"
								/>
								<label htmlFor="bio">Bio*</label>
							</div>
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
									Sign up
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
export default Register;
