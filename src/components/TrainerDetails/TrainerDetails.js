import React, {Component} from 'react';
import {connect} from 'react-redux';

import {LOCAL_TRAINERS_ACTIONS} from '../../redux/actions/localTrainerActions.js';

class TrainerDetails extends Component{
    constructor(props){
        super(props)
        this.state = {
            editing: false,
            trainer: null
        }
    }

    componentDidMount = () => {
        console.log(this.props.match.params.id);
        this.props.dispatch({
            type: LOCAL_TRAINERS_ACTIONS.FETCH_LOCAL_TRAINER_DETAILS,
            payload: this.props.match.params.id
        })
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.trainer !== this.props.trainer) {

            this.setState({
                trainer: this.props.trainer
            })
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
                type: LOCAL_TRAINERS_ACTIONS.EDIT_LOCAL_TRAINER,
                payload: this.state.trainer
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
    
            if (this.state.editing){
                fnameField = <input type="text" placeholder="first name" value={this.state.trainer.first_name}/>
                lnameField = <input type="text" placeholder="last name" value={this.state.trainer.last_name}/>
                titleField = <input type="text" placeholder="title" value={this.state.trainer.title}/>
                emailField = <input type="text" placeholder="email" value={this.state.trainer.email}/>
                phoneField = <input type="text" placeholder="phone number" value={this.state.trainer.phone_number}/>
                organizationField = <input type="text" placeholder="organization" value={this.state.trainer.organization}/>
                districtField = <input type="text" placeholder="district" value={this.state.trainer.district}/>
                notesField = <textarea type="text" placeholder="notes"></textarea>
            }
        }

        return(
            <React.Fragment>
                {JSON.stringify(this.state.trainer)}
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

const mapStateToProps = state => ({
    trainer: state.localTrainersReducer.localTrainerDetails
})

export default connect(mapStateToProps)(TrainerDetails);