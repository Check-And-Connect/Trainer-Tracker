import React, {Component} from 'react';
import {connect} from 'react-redux';

import {LOCAL_TRAINERS_ACTIONS} from '../../redux/actions/localTrainerActions';

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
                cohort_id: ''
            }
        }
    }

    handleInputChange = (e) => {
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
    }


    render(){
        return(
            <div className="trainerDetails">
                <h3>Trainer Information</h3>
                <hr></hr>
                <div>{this.state.editing ? <input</div>
        )
    }
};

export default connect(TrainerDetails);