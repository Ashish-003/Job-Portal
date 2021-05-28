import React, { Component } from "react";
import { Link } from "react-router-dom";
class Landing extends Component {
    render() {
        return (
            <div className="container">
                <div
                    className="col s12"
                    style={{ paddingLeft: "11.250px" }}
                >
                    <p className="grey-text text-darken-1">
                        Already have an account?{" "}
                        <Link to="/login">Log in</Link>
                    </p>
                </div>
                <div style={{ height: "75vh" }}
                    className="container valign-wrapper"
                >
                    <div className="row">
                        <div className="col s12 center-align">
                            <p className="flow-text grey-text text-darken-1">
                                Register
						</p>
                            <br />
                            <div className="col s6">
                                <Link
                                    to="/register/app"
                                    style={{
                                        width: "140px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px"
                                    }}
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                    Applicant
							</Link>
                            </div>
                            <div className="col s6">
                                <Link
                                    to="/register/rec"
                                    style={{
                                        width: "140px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px"
                                    }}
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                    Recruiter
							</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Landing;
