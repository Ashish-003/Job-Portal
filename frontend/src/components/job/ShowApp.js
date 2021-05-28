import React, { Component } from "react";
import axios from "axios";
import ls from "local-storage";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
class ShowApp extends Component {
    constructor(){
        super();
        this.state = {
            response:[],
            sortName: true,
            sortRating: true,
            sortdate: true,
            errors : {}
        };
        this.renderIcon = this.renderIcon.bind(this);
        this.sortChange = this.sortChange.bind(this);
        this.renderRatingIcon = this.renderRatingIcon.bind(this);
        this.sortRatingChange = this.sortRatingChange.bind(this);
        this.renderdateIcon = this.renderdateIcon.bind(this);
        this.sortdateChange = this.sortdateChange.bind(this);
    }
    componentDidMount(){
        const data = { mail: ls.get("email"),jtitle: ls.get("title")};
        axios
        .post('http://localhost:4000/app/viewrec', data)
        .then( async res => {
            await this.setState({ response: res.data });
            console.log(this.state.response);
        })
        .catch(function(res) {
            alert(res.response.data[Object.keys(res.response.data)[0]]);
        });
    }
    sortChange() {
        var array = this.state.response;
        var flag = this.state.sortName;
        console.log(array)
        array.sort(function (a, b) {
            if (a.name != undefined && b.name != undefined) {
                return (1 - flag * 2) * (a.appname - b.appname);
            }
            else {
                return 1;
            }
        });
        this.setState({
            response: array,
            sortName: !this.state.sortName,
        })
    }
    renderIcon() {
        if (this.state.sortName) {
            return (
                <ArrowDownwardIcon />
            )
        }
        else {
            return (
                <ArrowUpwardIcon />
            )
        }
    }
    sortRatingChange() {
        var array = this.state.response;
        var flag = this.state.sortRating;
        array.sort(function (a, b) {
            if (a.rating != undefined && b.rating != undefined) {
                return (1 - flag * 2) * (a.rating - b.rating);
            }
            else {
                return 1;
            }
        });
        this.setState({
            response: array,
            sortRating: !this.state.sortRating,
        })
    }
    async sortdateChange() {
        var array = this.state.response;
        var flag = this.state.sortdate;
        await array.sort(async function (a, b) {
            if (a.appdate != undefined && b.appdate != undefined) {
                console.log("a");
                await console.log(a.appdate)
                await console.log(b.appdate)
                await console.log(new Date(a.appdate) - new Date(b.appdate));
                return  (1 - flag * 2) * (new Date(await a.appdate) - new Date(await b.appdate));
            }
            else {
    
            }
            
        });
        console.log(flag)
        this.setState({
            response: array,
            sortdate: !this.state.sortdate,
        })
    }
    renderdateIcon() {
        if (this.state.sortdate) {
            return (
                <ArrowDownwardIcon />
            )
        }
        else {
            return (
                <ArrowUpwardIcon />
            )
        }
    }
    renderRatingIcon() {
        if (this.state.sortRating) {
            return (
                <ArrowDownwardIcon />
            )
        }
        else {
            return (
                <ArrowUpwardIcon />
            )
        }
    }
    render(){
        return (
            <Table size="medium">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><Button onClick={this.sortChange}>{this.renderIcon()}</Button>Applicant Name</TableCell>
                                        <TableCell>Skills</TableCell>
                                        <TableCell><Button onClick={this.sortdateChange}>{this.renderdateIcon()}</Button>Apply Date</TableCell>
                                        <TableCell>SoP</TableCell>
                                        <TableCell><Button onClick={this.sortRatingChange}>{this.renderRatingIcon()}</Button>Rating</TableCell>
                                        <TableCell>Status </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.response.map((user, ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{user.appname}</TableCell>
                                            <TableCell>{user.skills}</TableCell>
                                            <TableCell>{user.appdate}</TableCell>
                                            <TableCell>{user.sop}</TableCell>
                                            <TableCell>{user.rating}</TableCell>
                                            <TableCell>{user.status}</TableCell>
                                            <TableCell>
                                                {/* {user.appstatus == "Full" ? (<Button className="btn btn-primary" disabled>Full</Button>)
                                                    : (user.appstatus == "Applied" ? (<Button variant="contained" color="primary" disabled>Applied</Button>)
                                                        : (<Button variant="contained" color="primary" onClick={this.onApply(user._id, user.recmail,user.title,user.salary,user.recname)}>Apply</Button>))} */}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
        );
    }
}
export default ShowApp;