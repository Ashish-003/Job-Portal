import React, { Component } from "react";
import axios from "axios";
import ls from "local-storage";
import TextField from '@material-ui/core/TextField';

class EditJob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orig_app:"",
            orig_pos:"",
            num_app: "",
            position: "",
            time:new Date(),
            response:[],
            errors: {}
        };
    }
    componentDidMount() {
		const data = { mail: ls.get("email"), title: ls.get("title")};
		axios
			.post('http://localhost:4000/job/viewx', data)
			.then( async res => {
                await this.setState({ response: res.data });
                console.log("hello");
                console.log(this.state.response);
                console.log("heyy");
                console.log(this.state.response.time);
                await this.setState({
                num_app:this.state.response.num_app,
                position:this.state.response.position,
                time:this.state.response.time
            });
			})
			.catch(function(res) {
				alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
	}
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const jobData = {
            mail: ls.get("email"),
            title: ls.get("title"),
            num_app: this.state.num_app,
            position: this.state.position,
            time:this.state.time
        };
        console.log(jobData);
        axios
            .post('http://localhost:4000/job/edit', jobData)
            .then(function (res) {

            }).catch(function (res) {
                alert(res.response.data[Object.keys(res.response.data)[0]]);
            });
        window.location = "/viewjob";

    };
    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <div
                            className="col s12"
                            style={{ paddingLeft: "11.250px" }}
                        >
                            <h4>
                                <b>Edit Job </b> for {ls.get("title")}
							</h4>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.num_app}
                                    error={errors.num_app}
                                    id="num_app"
                                    type="text"
                                    className = "active"
                                    InputLabelProps={{
                                        shrink: true,
                                      }}
                                />
                                <label htmlFor="num_app" className = "active">Number of applications</label>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    
                                    onChange={this.onChange}
                                    value={this.state.position}
                                    error={errors.position}
                                    id="position"
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                      }}
                                />
                                <label htmlFor="position">Positions</label>
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
                                    Edit Job
								</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default EditJob;