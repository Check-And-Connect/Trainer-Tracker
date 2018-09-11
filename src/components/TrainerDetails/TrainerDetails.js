import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios'
import {COHORT_ACTIONS} from '../../redux/actions/cohortActions';

import TrainerHistoryStepper from '../TrainerHistoryStepper/TrainerHistoryStepper';

import {withStyles, Button, TextField, Select, MenuItem} from '@material-ui/core';

const styles = {
    mainComponent: {
        display: "Grid",
        gridTemplateColumns: "1fr 1fr"
    }
}

class TrainerDetails extends Component{
    constructor(props){
        super(props)
        this.state = {
            editing: false,
            trainer: null,
            requirements: null,
            cohort: null,
            slo: null
        }
    }

    componentDidMount = () => {
        this.props.dispatch({ type: COHORT_ACTIONS.FETCH_STATES });
        this.props.dispatch({ type: COHORT_ACTIONS.FETCH_COHORTS });
        this.props.dispatch({ type: COHORT_ACTIONS.FETCH_STATE_LEVEL_ORG });


        let localTrainerID = this.props.match.params.id;
        axios.get(`/api/localTrainers/${localTrainerID}`)
            .then(res => {
                this.setState({
                    trainer: res.data.trainer,
                    requirements: res.data.requirements,
                    cohort: res.data.cohort,
                    slo: res.data.slo,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleInputChange = (e) => {
        console.log(e.target.name, e.target.value);
        this.setState({
            trainer: {
                ...this.state.trainer,
                [e.target.name]: e.target.value
            }
        })
        if (e.target.name === 'state'){
            this.props.dispatch({ type: COHORT_ACTIONS.FETCH_FILTER_STATE, payload: e.target.value });
        }
    }

    handleIconClick = () => {
        if (this.state.editing){
            let localTrainerID = this.props.match.params.id;
            axios.put(`/api/localTrainers/${localTrainerID}`, this.state.trainer)
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        this.setState({
            editing: !this.state.editing
        })
    }

    render(){

        let { classes } = this.props;

        let stateListArray;
        let cohortListArray;
        let sloListArray;

        if (this.props.cohortReducer !== undefined){
            stateListArray = this.props.cohortReducer.state_dropDown.map((item, index) => {
                return(
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                )
            })
            cohortListArray = this.props.cohortReducer.cohort_dropDown.map((cohort, index) => {
                return(
                    <MenuItem key={index} value={cohort.name}>{cohort.name}</MenuItem>
                )
            })
            sloListArray = this.props.cohortReducer.SLO_dropDown.map((slo, index) => {
                return(
                    <MenuItem key={index} value={slo.name}>{slo.name}</MenuItem>
                )
            })
        }

        let fnameField;
        let lnameField;
        let titleField;
        let emailField;
        let phoneField;
        let organizationField;
        let districtField;
        let notesField;
        let stateDropdown;
        let sloDropdown;
        let cohortDropdown;

        if (this.state.trainer !== null){
            fnameField = <span>{this.state.trainer.first_name}</span>;
            lnameField = <span>{this.state.trainer.last_name}</span>;
            titleField = <span>{this.state.trainer.title}</span>;
            emailField = <span>{this.state.trainer.email}</span>;
            phoneField = <span>{this.state.trainer.phone_number}</span>;
            organizationField = <span>{this.state.trainer.organization}</span>;
            districtField = <span>{this.state.trainer.district}</span>;
            notesField = <span>{this.state.trainer.notes}</span>
            if (this.state.editing){
                fnameField = <TextField type="text" name="first_name" placeholder="first name" value={this.state.trainer.first_name} onChange={this.handleInputChange}/>
                lnameField = <TextField type="text" name="last_name" placeholder="last name" value={this.state.trainer.last_name} onChange={this.handleInputChange}/>
                titleField = <TextField type="text" name="title" placeholder="title" value={this.state.trainer.title} onChange={this.handleInputChange}/>
                emailField = <TextField type="text" name="email" placeholder="email" value={this.state.trainer.email} onChange={this.handleInputChange}/>
                phoneField = <TextField type="text" name="phone_number" placeholder="phone number" value={this.state.trainer.phone_number} onChange={this.handleInputChange}/>
                organizationField = <TextField type="text" name="organization" placeholder="organization" value={this.state.trainer.organization} onChange={this.handleInputChange}/>
                districtField = <TextField type="text" name="district" placeholder="district" value={this.state.trainer.district} onChange={this.handleInputChange}/>
                notesField = <textarea type="text" name="notes" placeholder="notes" value={this.state.trainer.notes} onChange={this.handleInputChange}></textarea>
                stateDropdown = <Select value={this.state.slo.state} name="state" onChange={this.handleInputChange}>{stateListArray}</Select>
                sloDropdown = <Select value={this.state.slo.name} name="slo" onChange={this.handleInputChange}>{sloListArray}</Select>
                cohortDropdown = <Select value={this.state.cohort.name} name="cohort" onChange={this.handleInputChange}>{cohortListArray}</Select>
            }
        }

        let requirementsHistory;
        if (this.state.requirements !== null){
            requirementsHistory = this.state.requirements.map(requirement => {
                return(
                    <div className="requirementHistory">
                        <p key={requirement.requirements_id}>{requirement.name}</p>
                    </div>
                )
            })
        }

        return(
            <React.Fragment>
            <Button onClick={this.handleIconClick}>{this.state.editing ? "Save" : "Edit"}</Button>
            <div className={classes.mainComponent}>
                <h3>Trainer Information</h3>
                <div>First Name: {fnameField}</div>
                <div>Last Name: {lnameField}</div>
                <div>Title: {titleField}</div>
                <div>Email Address: {emailField}</div>
                <div>Phone Number: {phoneField}</div>
                <div>Organization: {organizationField}</div>
                <div>District: {districtField}</div>
                <div>State: {stateDropdown}</div>
                <div>State-Level Organization: {sloDropdown}</div>
                <div>Cohort: {cohortDropdown}</div>
            </div>
            <hr></hr>
            <div className="trainerNotes">
                <h3>Notes</h3>
                <br></br>
                <div>{notesField}</div>
            </div>
            <hr></hr>
            <div className="trainerHistory">
                <h3>History</h3>
                <TrainerHistoryStepper 
                    requirements={this.state.requirements} 
                />
            </div>
            </React.Fragment>
        )
    }
};

const mapStateToProps = state => ({
    cohortReducer: state.cohortReducer
})

const styledComponent = withStyles(styles)(TrainerDetails);
export default connect(mapStateToProps)(styledComponent);