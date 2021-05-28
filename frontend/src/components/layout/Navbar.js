import React, { Component } from "react";
import { Link } from "react-router-dom";
import ls from "local-storage";

class Navbar extends Component {
	constructor() {
		super();
		this.state = {
			search: ""
		};
	}
	handleClick(event) {
		event.preventDefault();
		ls.set("auth", "false");
		ls.set("usertype", "");
		ls.set("email", "");
		window.location = "/";
	}

	onSubmit = e => {
		event.preventDefault();
		ls.set("search", this.state.search);
		window.location = "/searchresult";
	};

	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link className="nav-link" to="/">
								Home
							</Link>
						</li>
						{ls.get("usertype") === "recruiter" ? (
							<li className="nav-item">
								<Link className="nav-link" to="/addjob">
									Add Job
								</Link>ven
							</li>
						) : null}
						{ls.get("usertype") === "recruiter" ? (
							<li className="nav-item">
								<Link className="nav-link" to="/viewjob">
									List Jobs 
								</Link>
							</li>
						) : null}
						{ls.get("usertype") === "Vendor" ? (
							<li className="nav-item">
								<Link className="nav-link" to="/dispatch">
									Ready To Dispatch
								</Link>
							</li>
						) : null}
						{ls.get("usertype") === "applicant" ? (
							<li className="nav-item">
								<Link className="nav-link" to="/joblist">
									Job Listings
								</Link>
							</li>
						) : null}
						{ls.get("usertype") === "applicant" ? (
							<li className="nav-item">
								<Link className="nav-link" to="/viewapp">
									My Applications
								</Link>
							</li>
						) : null}
						{ls.get("usertype") === "applicant" ? (
							<li className="nav-item">
								<Link className="nav-link" to="/aprofile">
									My profile
								</Link>
							</li>
						) : null}
						{ls.get("usertype") === "recruiter" ? (
							<li className="nav-item">
								<Link className="nav-link" to="/rprofile">
									My profile
								</Link>
							</li>
						) : null}
						{ls.get("auth") === "true" ? (
							<li className="nav-link">
								<Link
									className="nav-link"
									to="#"
									onClick={this.handleClick}
								>
									LogOut
								</Link>
							</li>
						) : null}
					</ul>
				</div>
			</nav>
		);
	}
}
export default Navbar;
