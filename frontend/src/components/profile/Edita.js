import React, { Component } from "react";
import axios from "axios";
import ls from "local-storage";
import Button from '@material-ui/core/Button';
class Aprofile extends Component {
    constructor() {
        super();
        this.state = {
            response: [],
            name:"",
            email:"",
            skills:"",
            errors:{}
        };
    }
    async componentDidMount() {
        const data = {
            appmail: ls.get("email")
        }
        await axios.post('http://localhost:4000/user/app', data)
            .then(async res => {
                await this.setState({ response: res.data });
                await this.setState({
                    name : this.state.response.name,
                    email : this.state.response.email,
                    skills : this.state.response.skills,
                })
                console.log(this.state.response)
            })
            .catch(function res() {
                alert(res.response.data[Object.keys(res.response.data)[0]]);
            });
    }
    onSubmit = arg => e => {
        // e.preventDefault;
        console.log("ho")
        const data = {
            appmail: ls.get("email"),
            name:this.state.name,
            skills:this.state.skills,
        }
        axios.post('http://localhost:4000/user/appupdate', data)
            .then(async res => {
               await  console.log(res.data)
            })
            .catch(function res() {
                alert(res.response.data[Object.keys(res.response.data)[0]]);
            });
        window.location = "/aprofile";
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    render() {
        const { errors } = this.state;
        return (

            <div className="container">
                <h3>Your Profile</h3>
                <div className="row">
                    <div className="col s8 offset-s2">
                        <div
                            className="col s12"
                            style={{ paddingLeft: "11.250px" }}
                        >
                            <h4>
                                <b>Edit Profile </b>
                            </h4>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                        <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="name"
                                    type="text"
                                    className = "active"
                                    InputLabelProps={{
                                        shrink: true,
                                      }}
                                />
                                <label htmlFor="name" className = "active">Name</label>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="text"
                                    className = "active"
                                    disabled
                                    InputLabelProps={{
                                        shrink: true,
                                      }}
                                />
                                <label htmlFor="email" className = "active"></label>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.skills}
                                    error={errors.skills}
                                    id="skills"
                                    type="text"
                                    className = "active"
                                    InputLabelProps={{
                                        shrink: true,
                                      }}
                                />
                                <label htmlFor="skills" className = "active">Skills</label>
                            </div>
                            <div
                                className="col s12"
                                style={{ paddingLeft: "11.250px" }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.onSubmit()}>Update</Button>

                            </div>
                        </form>
                    </div>
                </div>
            </div >

        );
    }
}
export default Aprofile;