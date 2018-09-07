import React, {Component} from 'react';
import {connect} from 'react-redux';

import {LOCAL_TRAINERS_ACTIONS} from '../../redux/actions/localTrainerActions.js';

class TrainerDetails extends Component{
    constructor(props){
        super(props)
        this.state = {
            editing: false,
            trainer: {
                first_name: '',
                last_name: '',
                title: '',
                email: '',
                phone_number: '',
                organization: '',
                district: '',
                cohort_id: '',
                notes: ''
            }
        }
    }

    handleInputChange = (e) => {
        console.log('changin here');
        this.setState({
            trainer: {
                ...this.state.trainer,
                [e.target.name]: e.target.value
            }
        })
    }

    handleIconClick = () => {
        if (this.state.editing){
            this.props.dispatch({
                type: 'EDIT_LOCAL_TRAINER',
                payload: this.state.trainer
            })
        }
        this.setState({
            editing: !this.state.editing
        })
    }

    render(){

        let fnameField = <p>{this.state.first_name}</p>;
        let lnameField = <p>{this.state.last_name}</p>;
        let titleField = <p>{this.state.title}</p>;
        let emailField = <p>{this.state.email}</p>;
        let phoneField = <p>{this.state.phone_number}</p>;
        let organizationField = <p>{this.state.organization}</p>;
        let districtField = <p>{this.state.district}</p>;
        let notesField = <p>{this.state.notes}</p>

        if (this.state.editing){
            fnameField = <input type="text" placeholder="first name" />
            lnameField = <input type="text" placeholder="last name" />
            titleField = <input type="text" placeholder="title" />
            emailField = <input type="text" placeholder="email" />
            phoneField = <input type="text" placeholder="phone number" />
            organizationField = <input type="text" placeholder="organization" />
            districtField = <input type="text" placeholder="district" />
            notesField = <textarea type="text" placeholder="notes"></textarea>
        }

        return(
            <React.Fragment>
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
                Notes:
                <br></br>
                <div>{notesField}</div>
            </div>
            <div className="trainerHistory">

            </div>
            </React.Fragment>
        )
    }
};

export default connect()(TrainerDetails);