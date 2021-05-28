import React, { Component } from "react";
import ls from "local-storage";

class Welcome extends Component {
	render() {
		return (
			<h3>
				Hello {ls.get("username")}. You are a {ls.get("usertype")}
			</h3>
		);
	}
}
export default Welcome;
