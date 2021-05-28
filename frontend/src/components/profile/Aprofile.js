import React, { Component } from "react";
import axios from "axios";
import ls from "local-storage";
import Button from '@material-ui/core/Button';
class Aprofile extends Component {
    constructor() {
        super();
        this.state = {
            response: []
        };
    }
    async componentDidMount() {
        const data = {
            appmail: ls.get("email")
        }
        await axios.post('http://localhost:4000/user/app', data)
            .then(async res => {
                await this.setState({ response: res.data });
                console.log(this.state.response)
            })
            .catch(function res() {
                alert(res.response.data[Object.keys(res.response.data)[0]]);
            });
    }
    onSubmit = arg => e => {
        // e.preventDefault;
        console.log("ho")
        window.location = "/edita";
    }
    render() {
        return (

            <div className="container">
                <h3>Your Profile</h3>
                <div className="row">
                    <div className="col s8 offset-s2">
                        <h5>Name : {this.state.response.name}</h5>
                        <h5> Email : {this.state.response.email}</h5>
                        <h5>Skills : {this.state.response.skills}</h5>
                    </div>
                    <div
                        className="col s12"
                        style={{ paddingLeft: "11.250px" }}
                    >
                        <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={this.onSubmit()}>Edit</Button>
                            
                </div>
            </div>
            </div >

        );
    }
}
export default Aprofile;