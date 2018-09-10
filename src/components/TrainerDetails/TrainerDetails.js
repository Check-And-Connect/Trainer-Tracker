import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios'

import {Stepper, Step, StepLabel, StepContent} from '@material-ui/core';
import TrainerHistoryStepper from '../TrainerHistoryStepper/TrainerHistoryStepper';

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
        let fnameField;
        let lnameField;
        let titleField;
        let emailField;
        let phoneField;
        let organizationField;
        let districtField;
        let notesField;

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
                fnameField = <input type="text" name="first_name" placeholder="first name" value={this.state.trainer.first_name} onChange={this.handleInputChange}/>
                lnameField = <input type="text" name="last_name" placeholder="last name" value={this.state.trainer.last_name} onChange={this.handleInputChange}/>
                titleField = <input type="text" name="title" placeholder="title" value={this.state.trainer.title} onChange={this.handleInputChange}/>
                emailField = <input type="text" name="email" placeholder="email" value={this.state.trainer.email} onChange={this.handleInputChange}/>
                phoneField = <input type="text" name="phone_number" placeholder="phone number" value={this.state.trainer.phone_number} onChange={this.handleInputChange}/>
                organizationField = <input type="text" name="organization" placeholder="organization" value={this.state.trainer.organization} onChange={this.handleInputChange}/>
                districtField = <input type="text" name="district" placeholder="district" value={this.state.trainer.district} onChange={this.handleInputChange}/>
                notesField = <textarea type="text" name="notes" placeholder="notes" value={this.state.trainer.notes} onChange={this.handleInputChange}></textarea>
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
                {JSON.stringify(this.state)}
            <button onClick={this.handleIconClick}>{this.state.editing ? "Save" : "Edit"}</button>
            <div className="trainerDetails">
                <h3>Trainer Information</h3>
                <hr></hr>
                <div>First Name: {fnameField}</div>
                <div>Last Name: {lnameField}</div>
                <div>Title: {titleField}</div>
                <div>Email Address: {emailField}</div>
                <div>Phone Number: {phoneField}</div>
                <div>Organization: {organizationField}</div>
                <div>District: {districtField}</div>
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
                {requirementsHistory}
                <TrainerHistoryStepper />
            </div>
            </React.Fragment>
        )
    }
};

export default connect()(TrainerDetails);