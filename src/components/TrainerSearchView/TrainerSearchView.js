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
            searchInput: '',
            selectedCheckboxes: {
                state: [],
                slo: [],
                cohort: [],
                status: []
            }
        }
    }

    componentDidMount = () => {
        this.props.dispatch({
            type: TRAINER_ACTIONS.FETCH_TRAINERS
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

    render(){
        let displayedCheckboxes = {
            state: [],
            slo: [],
            cohort: [],
            status: []
        }
        let trainersTableBody = this.state.localTrainers.map((trainer) => {
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
                <TrainerSearchSidebar {...this.getCheckboxes()} />
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