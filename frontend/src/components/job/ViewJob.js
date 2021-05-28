import React, { Component } from "react";
import axios from "axios";
import ls from "local-storage";
import TocIcon from '@material-ui/icons/Toc';
import IconButton from '@material-ui/core/IconButton';

class Viewjob extends Component {
	constructor() {
		super();
		this.state = {
			response: []
		};
	}
	// const response;
	componentDidMount() {
		const data = { mail: ls.get("email") };
		axios
			.post('http://localhost:4000/job/view', data)
			.then( async res => {
				await this.setState({ response: res.data });
				console.log(this.state.response);
			})
			.catch(function(res) {
				alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
	}

	onSubmit = arg => e => {
		e.preventDefault();
		const jobtype= {
			title: document.getElementById(arg - 5).innerHTML,
			mail: ls.get("email")
		};
		console.log(jobtype);
		axios
			.post('http://localhost:4000/job/delete',jobtype)
			.then(async res => {
				await console.log(res);
				alert("Job Removed Successfuly");
				window.location.reload();
			})
			.catch(function(res) {
				alert(res.response.data[Object.keys(res.response.data)[0]]);
			});
	};
	onSubmitedit = arg => e => {
		e.preventDefault();
		const jobtype= {
			title: document.getElementById(arg - 6).innerHTML,
			mail: ls.get("email")
		};
		ls.set("title",document.getElementById(arg - 6).innerHTML);
		window.location = "/editjob";
		console.log(jobtype);

	};
	onSubmitline = arg => e=> {
		e.preventDefault();
		const jobtype= {
			title: document.getElementById(arg - 7).innerHTML,
			mail: ls.get("email")
		};
		ls.set("title",document.getElementById(arg - 7).innerHTML);
		window.location = "/showapp";
		console.log(jobtype)
	}


	createTable() {
		let table = [];
		let newtable = [];
		newtable = this.state.response;
		let i = 0;
		let heading = [
			<td key={i++}>Job title</td>,
			<td key={i++}>Applicants</td>,
			<td key={i++}>Positions</td>,
			<td key={i++}>Positions left</td>,
			<td key={i++}>Date posting</td>,
		];
		table.push(<tr key={i++}>{heading}</tr>);
		// let ans = []
		// for(i  = 0;i<18;i++){
		// 	if(i == 0 || i == 3 || i == 4 || i == 5 || i== 17){
		// 		ans.push(newtable[i]);
		// 	}
		// }
		//console.log(ans);
		for (const response of this.state.response) {
			let children = [];
			const  title = response.title,applicants = response.applied ,positions = response.position ,pos_left = response.pos_left,date_post = response.date;
			children.push(
				<td id={i} key={i++}>
					{title}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{applicants}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{positions}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{pos_left}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					{date_post}
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					<form onSubmit={this.onSubmit(i - 1)}>
						<button
							className="btn btn-outline-success my-2 my-sm-0"
							type="submit"
						>
							Delete Job
						</button>
					</form>
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					<form onSubmit={this.onSubmitedit(i - 1)}>
						<button
							className="btn btn-outline-success my-2 my-sm-0"
							type="edit"
						>
							Edit
						</button>
					</form>
				</td>
			);
			children.push(
				<td id={i} key={i++}>
					<form onSubmit={this.onSubmitline(i - 1)}>
					<button
							className="btn btn-outline-success my-2 my-sm-0"
							type="edit"
						>
							!!!
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

export default Viewjob;
