import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { LOCAL_TRAINERS_ACTIONS } from '../../redux/actions/localTrainerActions';
import { COHORT_ACTIONS } from '../../redux/actions/cohortActions';

import TrainerSearchSidebar from '../TrainerSearchSidebar/TrainerSearchSidebar';

import { withStyles } from "@material-ui/core";
import { Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core';

const styles = {
    mainComponent: {
      display: "Grid",
      gridTemplateColumns: "1fr 4fr"
    },
    leftPanel: {
      display: "Grid",
      gridTemplateRows: "3fr 1fr",
      backgroundColor: "red"
    },
    rightPanel: {
      display : "Grid",
      gridTemplateRows:"1fr 9fr",
      backgroundColor: "yellow"
    }
  };


class TrainerSearchView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            localTrainers: [],
            searchInput: '',
            // Using sets instead of arrays for the selections, since they are limited to 
            // unique values by default.
            selections: {
                state_name: new Set(),
                state_level_organization_name: new Set(),
                cohort_name: new Set(),
                status: new Set()
            },
            checkboxesDisplayed: null
        }
    }

    componentDidMount = () => {
        this.props.dispatch({
            type: LOCAL_TRAINERS_ACTIONS.FETCH_LOCAL_TRAINERS
        })
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.localTrainersReducer.allLocalTrainers !== this.props.localTrainersReducer.allLocalTrainers) {

            let newDisplayedCheckboxes = {
                state_name: new Set(),
                state_level_organization_name: new Set(),
                cohort_name: new Set(),
                status: new Set()
            }
            this.props.localTrainersReducer.allLocalTrainers.map((trainer) => {
                newDisplayedCheckboxes.state_name.add(trainer.state)
                newDisplayedCheckboxes.state_level_organization_name.add(trainer.state_level_organization.state_level_organization_name)
                newDisplayedCheckboxes.cohort_name.add(trainer.cohort.cohort_name)
            })

            this.setState({
                localTrainers: this.props.localTrainersReducer.allLocalTrainers,
                checkboxesDisplayed: newDisplayedCheckboxes,
                selections: newDisplayedCheckboxes
            })
                            // Since we are mapping through the trainer array as part of the render process anyway, here is a good place
                // to keep track of all the unique states, slos, cohorts, and statuses.

                // When we filter the trainer array, we will need to rerender, which means we recalcuate the checkboxes to display.
        }
    }

    handleExport = () => {
        console.log('export function called');
    }

    handleSearchInputChange = (e) => {
        this.setState({
            searchInput: e.target.value
        })
    }

    handleCheckboxClick = (e) => {
        console.log('handling checkbox click from the main component. e.target.name:', e.target.name);
        console.log('e.target.value', e.target.value);
        let newSet = new Set(this.state.selections[e.target.name]);
        if (newSet.has(e.target.value)){
            newSet.delete(e.target.value)
        } else {
            newSet.add(e.target.value)
        }

        this.setState({
            selections: {
                ...this.state.selections,
                [e.target.name]: newSet
            }
        })

        let filteredTrainersList = this.props.localTrainersReducer.allLocalTrainers.filter((trainer) => !newSet.has(trainer[e.target.name]))
        this.setState({
            localTrainers: filteredTrainersList
        })
    }

    handleStateCheckbox = (e) => {
        console.log('handling state checkbox');
        let newSet = new Set(this.state.selections.state_name);
        let sloSet = new Set();
        let cohortSet= new Set();
        if (newSet.has(e.target.value)){
            newSet.delete(e.target.value)
        } else {
            newSet.add(e.target.value)
        }

        this.setState({
            selections: {
                ...this.state.selections,
                state_name: newSet
            }
        })

        let filteredTrainersList = [];
        this.props.localTrainersReducer.allLocalTrainers.forEach((trainer) => {
            if (newSet.has(trainer.state)){
                sloSet.add(trainer.state_level_organization.state_level_organization_name);
                cohortSet.add(trainer.cohort.cohort_name);
                filteredTrainersList.push(trainer)
            }
        })

        console.log(sloSet);

        this.setState({
            localTrainers: filteredTrainersList,
            checkboxesDisplayed: {
                ...this.state.checkboxesDisplayed,
                state_level_organization_name: sloSet,
                cohort_name: cohortSet
            }
        })
    }

    render() {
        let { classes } = this.props;
        let trainersTableBody = null;

        let testArray = null;

        if (this.state.localTrainers) {
            trainersTableBody = this.state.localTrainers.map((trainer) => {
                return (
                    <TableRow key={trainer.local_trainers_id}>
                        <TableCell>{trainer.cohort.cohort_name}</TableCell>
                        <TableCell>{trainer.first_name}</TableCell>
                        <TableCell>{trainer.last_name}</TableCell>
                        <TableCell>{trainer.state}</TableCell>
                        <TableCell>{trainer.state_level_organization.state_level_organization_name}</TableCell>
                        <TableCell>Requirements</TableCell>
                    </TableRow>
                )
            })
        }

        return (
            <React.Fragment>
            <div className={classes.mainComponent}>
                 <div className={classes.leftPanel} >
                    <TrainerSearchSidebar 
                        {...this.state.checkboxesDisplayed} 
                        handleCheckboxClick={this.handleCheckboxClick} 
                        handleStateCheckbox={this.handleStateCheckbox}
                    />                 
                </div>
                <div className={classes.rightPanel}>

                    <input
                    onChange={this.handleSearchInputChange}
                    placeholder="filter table"
                    value={this.state.searchInput}
                    />

                <Table id="trainer-search-table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Cohort</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>State</TableCell>
                            <TableCell>State-Level Org.</TableCell>
                            <TableCell>Requirements</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {trainersTableBody}
                    </TableBody>
                </Table>
                </div>
            </div>
            </React.Fragment>
        )
    }
};

const mapStateToProps = (state) => state;


const componentWithStyle = withStyles(styles)(TrainerSearchView);
export default connect(mapStateToProps)(componentWithStyle);