import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { LOCAL_TRAINERS_ACTIONS } from '../../redux/actions/localTrainerActions';
import { COHORT_ACTIONS } from '../../redux/actions/cohortActions';

import TrainerSearchSidebar from '../TrainerSearchSidebar/TrainerSearchSidebar';

import { Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core';

class TrainerSearchView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            localTrainers: [],
            searchInput: ''
        }
    }

    componentDidMount = () => {
        this.props.dispatch({
            type: LOCAL_TRAINERS_ACTIONS.FETCH_LOCAL_TRAINERS
        })
        // Not quite sure how the timing of this is supposed to work.
        // We want to wait until the full trainer list is mapped from redux state to props,
        // and then assign that whole array to local state. Ideally this means we have a
        // pretty simple render function that works the same way on the initial page load
        // as it does when one of the checkboxes is toggled.

    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.localTrainersReducer.allLocalTrainers !== this.props.localTrainersReducer.allLocalTrainers) {
            this.setState({
                localTrainers: this.props.localTrainersReducer.allLocalTrainers
            })
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

    // This function gets the checkbox value off of the event object and uses that to filter the array of trainers.



    render() {

        let displayedCheckboxes = {
            state: [],
            slo: [],
            cohort: [],
            status: []
        }
        let trainersTableBody = null;
        if (this.state.localTrainers) {
            trainersTableBody = this.state.localTrainers.map((trainer) => {
                // Since we are mapping through the trainer array as part of the render process anyway, here is a good place
                // to keep track of all the unique states, slos, cohorts, and statuses.

                // When we filter the trainer array, we will need to rerender, which means we recalcuate the checkboxes to display.
                if (!displayedCheckboxes.state.includes(trainer.state)) displayedCheckboxes.state.push(trainer.state);
                if (!displayedCheckboxes.slo.includes(trainer.state_level_organization)) displayedCheckboxes.slo.push(trainer.state_level_organization);
                if (!displayedCheckboxes.cohort.includes(trainer.cohort_name)) displayedCheckboxes.cohort.push(trainer.cohort_name);
                if (!displayedCheckboxes.status.includes(trainer.status)) displayedCheckboxes.status.push(trainer.status);

                console.log(displayedCheckboxes);

                return (
                    <TableRow key={trainer.local_trainers_id}>
                        <TableCell>{trainer.cohort.cohort_name}</TableCell>
                        <TableCell>{trainer.first_name}</TableCell>
                        <TableCell>{trainer.last_name}</TableCell>
                        <TableCell>{trainer.state}</TableCell>
                        <TableCell>{trainer.state_level_organization.state_level_organization_name}</TableCell>
                        <TableCell>{JSON.stringify(trainer.requirements)}</TableCell>
                    </TableRow>
                )
            })
        }
        return (
            <div>
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

                {JSON.stringify(this.props.localTrainersReducer.allLocalTrainers)}
            </div>
        )
    }
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(TrainerSearchView);