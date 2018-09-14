import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { COHORT_ACTIONS } from '../../redux/actions/cohortActions';

import Grid from '@material-ui/core/Grid';
import {
    TextField,
    withStyles,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Typography
} from '@material-ui/core';

const mapStateToProps = state => ({
    user: state.user,
    localTrainerReducer: state.localTrainerReducer,
    cohortReducer: state.cohortReducer,
    stateLeadReducer: state.stateLeadReducer
});

const styles = {
    textField: {
        margin: '0em 0em 0.5em 0em',
        width: "14em"
    },
    dropDown: {
        width: "10em"
    },
    formControl: {
        margin: '0em 0em 0.5em 0em',
        width: "14em"
    },
    selectEmpty: {
        marginTop: '0em 0em 0.5em 0em' * 2,
    }
}

class AddTrainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            newTrainer: {
                first_name: '',
                last_name: '',
                title: '',
                email: '',
                phone_number: '',
                organization: '',
                state: '',
                state_level_organization: '',
                district: '',
                cohort: ''
            },
            recentlyAdded: []
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: COHORT_ACTIONS.FETCH_STATES });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    handleChangeFor = (propertyName) => {
        return (event) => {
            this.setState({
                newTrainer: {
                    ...this.state.newTrainer,
                    [propertyName]: event.target.value
                }
            })
        }
    }

    handleChangeForState = (propertyName) => {
        return (event) => {
            this.setState({
                newTrainer: {
                    ...this.state.newTrainer,
                    [propertyName]: event.target.value
                }
            })
            this.props.dispatch({ type: COHORT_ACTIONS.FETCH_FILTER_STATE, payload: event.target.value });
        }
    }

    handleChangeForSLO = (propertyName) => {
        return (event) => {
            this.setState({
                newTrainer: {
                    ...this.state.newTrainer,
                    [propertyName]: event.target.value
                }
            })
            this.props.dispatch({ type: COHORT_ACTIONS.FETCH_FILTER_SLO, payload: event.target.value });
        }
    }

    reset = () => {
        let stateDrop = document.getElementById("stateDrop");
        stateDrop.selectedIndex = 0;
        let SLODrop = document.getElementById("SLODrop");
        SLODrop.selectedIndex = 0;
        let cohortDrop = document.getElementById("cohortDrop");
        cohortDrop.selectedIndex = 0;
    }

    addNewTrainer = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_LT', payload: this.state.newTrainer })
        this.setState({
            recentlyAdded: [
                ...this.state.recentlyAdded,
                this.state.newTrainer
            ]
        })
        this.setState({
            newTrainer: {
                first_name: '',
                last_name: '',
                title: '',
                email: '',
                phone_number: '',
                organization: '',
                district: ''
            }
        });
        this.reset();
    }

    render() {
        let stateListArray = this.props.cohortReducer.state_dropDown.map((item, index) => {
            return <MenuItem key={index} value={item}>{item}</MenuItem>
        })
        let SLOListArray = this.props.cohortReducer.SLO_dropDown.map((item, index) => {
            return <MenuItem key={index} value={item.state_level_organization_id}>{item.name}</MenuItem>
        })
        let cohortListArray = this.props.cohortReducer.cohort_dropDown.map((item, index) => {
            return <MenuItem key={index} value={item.cohort_id}>{item.name}</MenuItem>
        })
        let recentListArray = this.state.recentlyAdded.map((item, index) => {
            return <TableRow key={index}>
                <TableCell>
                    {item.first_name}
                </TableCell>
                <TableCell>
                    {item.last_name}
                </TableCell>
                <TableCell>
                    {item.state}
                </TableCell>
            </TableRow>

        })

        let content = null;
        if (this.props.user.userName) {
            content = (
                <div>
                    <Typography className='centerHeadings' variant="display2">Create New Trainer</Typography>
                    <Grid container>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8}>
                            <form className='trainerForm'>
                                <Grid container>
                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={5}>
                                        <TextField
                                            className={this.props.classes.textField}
                                            label="First Name"
                                            value={this.state.newTrainer.first_name}
                                            onChange={this.handleChangeFor('first_name')}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl className={this.props.classes.formControl}>
                                            <InputLabel>State</InputLabel>
                                            <Select
                                                value={this.state.newTrainer.state}
                                                onChange={this.handleChangeForState('state')}
                                                id='stateDrop'
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {stateListArray}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={5}>
                                        <TextField
                                            className={this.props.classes.textField}
                                            label="Last Name"
                                            value={this.state.newTrainer.last_name}
                                            onChange={this.handleChangeFor('last_name')}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl className={this.props.classes.formControl}>
                                            <InputLabel>State Level Organization</InputLabel>
                                            <Select
                                                value={this.state.newTrainer.state_level_organization}
                                                onChange={this.handleChangeForSLO('state_level_organization')}
                                                id='SLODrop'
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {SLOListArray}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={5}>
                                        <TextField
                                            className={this.props.classes.textField}
                                            label="Title"
                                            value={this.state.newTrainer.title}
                                            onChange={this.handleChangeFor('title')}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl className={this.props.classes.formControl}>
                                            <InputLabel>Cohort</InputLabel>
                                            <Select
                                                value={this.state.newTrainer.cohort}
                                                onChange={this.handleChangeFor('cohort')}
                                                id='cohortDrop'
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {cohortListArray}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={10}>
                                        <TextField
                                            className={this.props.classes.textField}
                                            label="Email"
                                            value={this.state.newTrainer.email}
                                            onChange={this.handleChangeFor('email')}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={10}>
                                        <TextField
                                            className={this.props.classes.textField}
                                            label="Phone Number"
                                            value={this.state.newTrainer.phone_number}
                                            onChange={this.handleChangeFor('phone_number')}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={10}>
                                        <TextField
                                            className={this.props.classes.textField}
                                            label="Organization"
                                            value={this.state.newTrainer.organization}
                                            onChange={this.handleChangeFor('organization')}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={5}>
                                        <TextField
                                            className={this.props.classes.textField}
                                            label="District"
                                            value={this.state.newTrainer.district}
                                            onChange={this.handleChangeFor('district')}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button variant="outlined" onClick={this.addNewTrainer}>Submit</Button>
                                    </Grid>
                                    <Grid item xs={3}></Grid>
                                </Grid>
                            </form>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                    <Typography className='centerHeadings' variant="display1">Recently Added</Typography>
                    <Grid container>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}>
                            <Paper>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                First Name
                                            </TableCell>
                                            <TableCell>
                                                Last Name
                                            </TableCell>
                                            <TableCell>
                                                State
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {recentListArray}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>
                </div>
            );
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}

const styleTrainer = withStyles(styles)(AddTrainer)
export default connect(mapStateToProps)(styleTrainer);