import ls from "local-storage";
import React, { Component } from "react";
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

class ViewApp extends Component {
    constructor() {
        super();
        this.state = {
            response: [],
            job: []
        };
    }
    async componentDidMount() {
        const data = { mail: ls.get("email") };
        await axios.
            post('http://localhost:4000/app/view', data)
            .then(async res => {
                await this.setState({ response: res.data });
                await console.log(this.state.response);
            })
            .catch(function (res) {
                alert(res.response.data[Object.keys(res.response.data)[0]]);
            });
        var temp = [];
        console.log("i")
        await console.log(this.state.response.length);
    }
    onSubmit = arg => e => {
		e.preventDefault();
		// const jobtype= {
		// 	title: document.getElementById(arg - 5).innerHTML,
		// 	mail: ls.get("email")
		// };
		// console.log(jobtype);
		// axios
		// 	.post('http://localhost:4000/job/delete',jobtype)
		// 	.then(async res => {
		// 		await console.log(res);
		// 		alert("Job Removed Successfuly");
		// 		window.location.reload();
		// 	})
		// 	.catch(function(res) {
		// 		alert(res.response.data[Object.keys(res.response.data)[0]]);
		// 	});
	};
    createTable() {
        let table = [];
        let newtable = [];
        newtable = this.state.response;
        let i = 0;
        let heading = [
            <td key={i++}>Job title</td>,
            <td key={i++}>Date of Joining</td>,
            <td key={i++}>Recruiter name</td>,
            <td key={i++}>Salary</td>,
            <td key={i++}>Rating</td>,
            <td key={i++}>Status</td>,
        ];
        table.push(<tr key={i++}>{heading}</tr>);
        	for (const response of this.state.response) {
        		let children = [];
        		const  title = response.jtitle,DOJ = response.joindate ,recname = response.recname ,Salary = response.salary, rating= response.rating,status = response.status;
        		children.push(
        			<td id={i} key={i++}>
        				{title}
        			</td>
        		);
        		children.push(
        			<td id={i} key={i++}>
        				{DOJ}
        			</td>
        		);
        		children.push(
        			<td id={i} key={i++}>
        				{recname}
        			</td>
        		);
        		children.push(
        			<td id={i} key={i++}>
        				{Salary}
        			</td>
        		);
        		children.push(
        			<td id={i} key={i++}>
        				{rating}
        			</td>
                );
                children.push(
        			<td id={i} key={i++}>
        				{status}
        			</td>
        		);
        		children.push(
        			<td id={i} key={i++}>
        				<form onSubmit={this.onSubmit(i - 1)}>
        					<button
        						className="btn btn-outline-success my-2 my-sm-0"
        						type="submit"
        					>
                                Rate Job
        					</button>
        				</form>
        			</td>
        		);
        		table.push(<tr key={i++}>{children}</tr>);
        		i++;
        	}
        return table;
    }
    render() {
        const table = this.createTable();
        return (
            <table>
                <tbody>{table}</tbody>
            </table>
        );
    }
}
export default ViewApp;