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
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Fuse from 'fuse.js';

class Joblist extends Component {
    constructor() {
        super();
        this.state = {
            response: [],
            filteredJobs: [],
            searchText: "",
            jobtext: "",
            sop: "",
            sortSalary: true,
            sortRating: true,
            sortDuration: true,
        };
        this.jobtype = [
            { label: "Full-time", value: "Full-time" },
            { label: "Part-time", value: "Part-time" },
            { label: "Work-from-home", value: "Work-from-home" }
        ];
        this.renderIcon = this.renderIcon.bind(this);
        this.onApply = this.onApply.bind(this);
        this.sortChange = this.sortChange.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.renderRatingIcon = this.renderRatingIcon.bind(this);
        this.sortRatingChange = this.sortRatingChange.bind(this);
        this.renderDurationIcon = this.renderDurationIcon.bind(this);
        this.sortDurationChange = this.sortDurationChange.bind(this);
    }
    async componentDidMount() {
        await axios.get('http://localhost:4000/job/')
            .then(async res => {
                await this.setState({ response: res.data });
                console.log(this.state.response)
            })
            .catch(function res() {
                alert(res.response.data[Object.keys(res.response.data)[0]]);
            });
        var state = [], jobs = [], temp = [];
        // console.log("i");
        // await console.log(this.state.response.length);
        //await console.log(this.state.response)
        for (var i = 0; i < await this.state.response.length; i++) {
         //   console.log("i");
            console.log(i);
            const pay = {
                jobid: await this.state.response[i]._id,
                appmail: ls.get("email")
            }
            console.log(pay);
            await axios.post('http://localhost:4000/app/viewx', pay)
                .then(async res => {
                    temp = res.data;
                    console.log(temp);
                    if (await res.data.length != 0) {

                        state.push("Applied");
                        console.log("a");
                    }
                    else {
                        if (await this.state.response[i].applied === await this.state.response[i].num_app || await this.state.response[i].pos_left === 0) {
                            state.push("Full");
                            console.log("b");
                        }
                        else {
                            state.push("Apply");
                            console.log("c");
                        }
                    }
                })
                .catch(function (res) {
                    console.log(res);
                });
        }
       // console.log(state);
        jobs = this.state.response;
       // console.log("isha kaun hai")
        for (var i = 0; i < this.state.response.length; i++) {
            jobs[i].appstatus = state[i];
        }
        // console.log(jobs);
        await this.setState({
            response: jobs,
            filteredJobs:jobs
        });
       // console.log(this.state.response);
    }
    sortChange() {
        var array = this.state.filteredJobs;
        var flag = this.state.sortSalary;
        array.sort(function (a, b) {
            if (a.salary != undefined && b.salary != undefined) {
                return (1 - flag * 2) * (a.salary - b.salary);
            }
            else {
                return 1;
            }
        });
        this.setState({
            filteredJobs: array,
            sortSalary: !this.state.sortSalary,
        })
    }
    renderIcon() {
        if (this.state.sortSalary) {
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
        var array = this.state.filteredJobs;
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
            filteredJobs: array,
            sortRating: !this.state.sortRating,
        })
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
    sortDurationChange() {
        var array = this.state.filteredJobs;
        var flag = this.state.sortDuration;
        array.sort(function (a, b) {
            if (a.duration != undefined && b.duration != undefined) {
                return (1 - flag * 2) * (a.duration - b.duration);
            }
            else {
                return 1;
            }
        });
        this.setState({
            filteredJobs: array,
            sortDuration: !this.state.sortDuration,
        })
    }
    renderDurationIcon() {
        if (this.state.sortDuration) {
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
    async updateSearch(event) {
        await this.setState({
            searchText: event.target.value.substr(0, 200)
        });
        if(this.state.searchText === ""){
            this.setState({
                filteredJobs:this.state.response,
            })
        }else{    
        const fuse = new Fuse(this.state.response, {
            keys: [
              'title',
            ]
          });
          const results = fuse.search(this.state.searchText);
          console.log(results);
          this.setState({
              filteredJobs:results.map(result => result.item),
          })
        }
    }
    onApply = (arg, z,title,salary,recname,skills) => e => {
        this.state.sop = prompt("Enter your SOP(max - 250 words)");
      
        const newApp = {
            Jobid: arg,
            recmail: z,
            appmail: ls.get("email"),
            sop: this.state.sop,
            jtitle:title,
            recname:recname,
            salary:salary,
            skills:skills,
            appname: ls.get("username"),
        }
        axios
            .post('http://localhost:4000/app/apply', newApp)
            .then(async function (res) {
                console.log("joj");
                await console.log(newApp);
                alert("Application submitted Successfully");
                
                window.location.reload();
            })
            .catch(function (res) {
                alert(res.response.data[Object.keys(res.response.data)[0]]);
            });
        // window.location.reload();
    }
    render() {
        return (
            <div>
                <Grid container>
                    <Grid item xs={12} md={3} lg={3}>
                        <List component="nav" aria-label="mailbox folders">
                            <ListItem text>
                                <h5>Filters</h5>
                            </ListItem>
                            <ListItem button>
                                <form noValidate autoComplete="off">
                                    <label>Salary</label>
                                    <TextField id="standard-basic" label="Enter Min" fullWidth={true} />
                                    <TextField id="standard-basic" label="Enter Max" fullWidth={true} />
                                </form>
                            </ListItem>
                            <Divider />
                            <ListItem button divider>
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={this.jobtype}
                                    getOptionLabel={(option) => option.label}
                                    style={{ width: 300 }}
                                    //value = {this.state.}
                                    //onChange = {this.update}

                                    renderInput={(params) => <TextField {...params} label="Select Job-Type" variant="outlined" />}
                                />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                        <List component="nav" aria-label="mailbox folders">
                            <TextField
                                id="standard-basic"
                                label="Search"
                                fullWidth={true}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment>
                                            <IconButton>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                value={this.state.searchText}
                                onChange={this.updateSearch}
                            />
                        </List>
                        <Paper>
                            <Table size="medium">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Rec Name</TableCell>
                                        <TableCell><Button onClick={this.sortRatingChange}>{this.renderRatingIcon()}</Button>Job Rating</TableCell>
                                        <TableCell><Button onClick={this.sortChange}>{this.renderIcon()}</Button>Salary</TableCell>
                                        <TableCell><Button onClick={this.sortDurationChange}>{this.renderDurationIcon()}</Button>Duration</TableCell>
                                        <TableCell>Job-type</TableCell>
                                        <TableCell>Deadline</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.filteredJobs.map((user, ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{user.title}</TableCell>
                                            <TableCell>{user.recname}</TableCell>
                                            <TableCell>{user.rating}</TableCell>
                                            <TableCell>{user.salary}</TableCell>
                                            <TableCell>{user.duration}</TableCell>
                                            <TableCell>{user.jobtype}</TableCell>
                                            <TableCell>{user.time}</TableCell>
                                            <TableCell>
                                                {user.appstatus == "Full" ? (<Button className="btn btn-primary" disabled>Full</Button>)
                                                    : (user.appstatus == "Applied" ? (<Button variant="contained" color="primary" disabled>Applied</Button>)
                                                        : (<Button variant="contained" color="primary" onClick={this.onApply(user._id, user.recmail,user.title,user.salary,user.recname,ls.get("skills"))}>Apply</Button>))}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </div >
        );
    }

}
export default Joblist;