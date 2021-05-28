import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ls from "local-storage";

import "./App.css";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Registerrec from "./components/auth/registerrec";
import Registerapp from "./components/auth/registerapp";
import Login from "./components/auth/Login";
import Choice from "./components/auth/choice";
import Welcome from "./components/Welcome";
import AddJob from "./components/job/AddJob";
import ViewJob from "./components/job/ViewJob";
import ViewApp from "./components/job/ViewApp";
import ShowApp from "./components/job/ShowApp";
import EditJob from "./components/job/EditJob";
import MyOrders from "./components/MyOrders";
import Joblist from "./components/job/Joblist";
import Rprofile from "./components/profile/Rprofile"
import Aprofile from "./components/profile/Aprofile"
import Edita from "./components/profile/Edita"
import Editr from "./components/profile/Editr"

// class App
class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Navbar />
					{ls.get("auth") === "true" ? (
						<Route exact path="/" component={Welcome} />
					) : (
						<Route exact path="/" component={Landing} />
					)}
					<Route exact path="/register" component={Register} />
					<Route exact path="/register/app" component={Registerapp} />
					<Route exact path="/register/rec" component={Registerrec} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/choice" component={Choice} />
					<Route exact path="/addjob" component={AddJob} />
					<Route exact path="/viewjob" component={ViewJob} />
					<Route exact path="/editjob" component={EditJob} />
					<Route exact path="/myorders" component={MyOrders} />
					<Route exact path="/joblist" component={Joblist} />
					<Route exact path="/viewapp" component={ViewApp} />
					<Route exact path="/showapp" component={ShowApp} />
					<Route exact path="/rprofile" component={Rprofile} />
					<Route exact path="/aprofile" component={Aprofile} />
					<Route exact path="/edita" component={Edita} />
					<Route exact path="/editr" component={Editr} />
				</div>
			</Router>
		);
	}
}
export default App;
