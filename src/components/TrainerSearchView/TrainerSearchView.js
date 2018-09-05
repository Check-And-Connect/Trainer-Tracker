import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {TRAINER_ACTIONS} from '../../redux/actions/trainerActions';
import {COHORT_ACTIONS} from '../../redux/actions/cohortActions';

import TrainerSearchSidebar from '../TrainerSearchSidebar/TrainerSearchSidebar';

class TrainerSearchView extends Component{
    constructor(props){
        super(props)
        this.state = {
            localTrainers: [],
            searchInput: ''
        }
    }

    componentDidMount = () => {
        this.props.dispatch({
            type: TRAINER_ACTIONS.FETCH_TRAINERS
        })
        // Not quite sure how the timing of this is supposed to work.
        // We want to wait until the full trainer list is mapped from redux state to props,
        // and then assign that whole array to local state. Ideally this means we have a
        // pretty simple render function that works the same way on the initial page load
        // as it does when one of the checkboxes is toggled.
        this.setState({
            localTrainers: this.props.allTrainers
        })
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
    handleTrainersFilter = (e) => {
        console.log(e.target.value);
        this.props.allTrainers.filter((trainer => {
            return(

            )
        }))
    }

    render(){
        let displayedCheckboxes = {
            state: [],
            slo: [],
            cohort: [],
            status: []
        }
        let trainersTableBody = this.state.localTrainers.map((trainer) => {
            // Since we are mapping through the trainer array as part of the render process anyway, here is a good place
            // to keep track of all the unique states, slos, cohorts, and statuses.

            // When we filter the trainer array, we will need to rerender, which means we recalcuate the checkboxes to display.
            if (!displayedCheckboxes[state].includes(trainer.state)) displayedCheckboxes[state].push(trainer.state);
            if (!displayedCheckboxes[slo].includes(trainer.stateLevelOrg)) displayedCheckboxes[slo].push(trainer.stateLevelOrg);
            if (!displayedCheckboxes[cohort].includes(trainer.cohortName)) displayedCheckboxes[cohort].push(trainer.cohortName);
            if (!displayedCheckboxes[status].includes(trainer.status)) displayedCheckboxes[status].push(trainer.status);

            return (
                <tr>
                    <Link to={`/cohort/${trainer.cohortID}`}>
                        <td>trainer.cohortName</td>
                    </Link>
                    <Link to={`/trainer/${trainer.id}`}>
                        <td>trainer.firstName</td>
                    </Link>
                    <Link to={`/trainer/${trainer.id}`}>
                        <td>trainer.lastName</td>
                    </Link>
                    <td>trainer.state</td>
                    <td>trainer.stateLevelOrg</td>
                    <td>trainer.mostRecentCert</td>
                    <td>trainer.upcomingCert</td>
                    <td>trainer.upcomigDate</td> 
                </tr>
            )
        })
        return(
            <div>
                {/* Spread the displayedCheckboxes object to make the keys available as props on the Sidebar */}
                <TrainerSearchSidebar {...displayedCheckboxes} />
                <input
                    onChange={this.handleSearchInputChange}
                    placeholder="filter table"
                    value={this.state.searchInput}
                />
                <table id="trainer-search-table">
                    <thead>
                        <tr>
                            <th>Cohort</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>State</th>
                            <th>State-Level Org.</th>
                            <th>Most Recent Cert.</th>
                            <th>Upcoming Cert.</th>
                            <th>Upcoming Date</th>
                        </tr>
                    </thead>
                    {trainersTableBody}
                </table>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    allTrainers: state.trainers
})

export default connect(mapStateToProps)(TrainerSearchView);