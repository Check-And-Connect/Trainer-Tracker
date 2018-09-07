import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios'

import {LOCAL_TRAINERS_ACTIONS} from '../../redux/actions/localTrainerActions.js';

class TrainerDetails extends Component{
    constructor(props){
        super(props)
        this.state = {
            editing: false,
            trainer: null,
            requirements: null,
            cohort: null
        }
    }

    componentDidMount = () => {
        let localTrainerID = this.props.match.params.id;
        axios.get(`/api/localTrainers/${localTrainerID}`)
            .then(res => {
                this.setState({
                    trainer: res.data.trainer,
                    requirements: res.data.requirements,
                    cohort: res.data.cohort
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
            fnameField = <p>{this.state.trainer.first_name}</p>;
            lnameField = <p>{this.state.trainer.last_name}</p>;
            titleField = <p>{this.state.trainer.title}</p>;
            emailField = <p>{this.state.trainer.email}</p>;
            phoneField = <p>{this.state.trainer.phone_number}</p>;
            organizationField = <p>{this.state.trainer.organization}</p>;
            districtField = <p>{this.state.trainer.district}</p>;
            notesField = <p>{this.state.trainer.notes}</p>
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
            </div>
            </React.Fragment>
        )
    }
};

export default connect()(TrainerDetails);