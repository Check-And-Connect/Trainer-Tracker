import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { COHORT_ACTIONS } from '../../redux/actions/cohortActions';

import Grid from '@material-ui/core/Grid';

const mapStateToProps = state => ({
    user: state.user,
    localTrainerReducer: state.localTrainerReducer,
    cohortReducer: state.cohortReducer,
    stateLeadReducer: state.stateLeadReducer
});

class AddTrainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            newTrainer: {
                first_name: '',
                last_name: '',
                title: '',
                email: '',
                phone_number: '',
                organization: '',
                state: '',
                state_level_organization: '',
                district: '',
                cohort: 0
            },
            // recentlyAdded: [
            //     {
            //         first_name: '',
            //         last_name: '',
            //         title: '',
            //         state: '',
            //         state_level_organization: '',
            //     }
            // ]
        }
    }



    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        // this.props.dispatch({ type: COHORT_ACTIONS.FETCH_COHORTS });
        this.props.dispatch({ type: COHORT_ACTIONS.FETCH_STATES });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    handleChangeFor = (propertyName) => {
        return (event) => {
            this.setState({
                newTrainer: {
                    ...this.state.newTrainer,
                    [propertyName]: event.target.value
                }
            })
        }
    }

    handleChangeForState = (propertyName) => {
        return (event) => {
            this.setState({
                newTrainer: {
                    ...this.state.newTrainer,
                    [propertyName]: event.target.value
                }
            })
            this.props.dispatch({ type: COHORT_ACTIONS.FETCH_FILTER_STATE, payload: event.target.value });
        }
    }

    handleChangeForSLO = (propertyName) => {
        return (event) => {
            this.setState({
                newTrainer: {
                    ...this.state.newTrainer,
                    [propertyName]: event.target.value
                }
            })
            this.props.dispatch({ type: COHORT_ACTIONS.FETCH_FILTER_SLO, payload: event.target.value });
        }
    }

    reset = () => {
        let stateDrop = document.getElementById("stateDrop");
        stateDrop.selectedIndex = 0;
        let SLODrop = document.getElementById("SLODrop");
        SLODrop.selectedIndex = 0;
        let cohortDrop = document.getElementById("cohortDrop");
        cohortDrop.selectedIndex = 0;
    }

    addNewTrainer = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_LT', payload: this.state.newTrainer })
        this.setState({
            recentlyAdded: {
                ...this.state.recentlyAdded,
                first_name: this.state.newTrainer.first_name,
                last_name: this.state.newTrainer.last_name,
                title: this.state.newTrainer.title,
                state: this.state.newTrainer.state,
                state_level_organization: this.state.newTrainer.state_level_organization
            }
        })
        this.setState({
            newTrainer: {
                first_name: '',
                last_name: '',
                title: '',
                email: '',
                phone_number: '',
                organization: '',
                district: ''
            }
        });
        this.reset();
    }

    render() {
        let stateListArray = this.props.cohortReducer.state_dropDown.map((item, index) => {
            return <option value={item}>{item}</option>
        })
        let SLOListArray = this.props.cohortReducer.SLO_dropDown.map((item, index) => {
            return <option value={item.state_level_organization_id}>{item.name}</option>
        })
        let cohortListArray = this.props.cohortReducer.cohort_dropDown.map((item, index) => {
            return <option value={item.cohort_id}>{item.name}</option>
        })

        // let recentListArray = this.props.recentlyAdded.map((item, index) => {
        //     return <li>{item.first_name} {item.last_name}</li> 
        // })

        let content = null;
        if (this.props.user.userName) {
        content = (
            <div>
                <h2 className='centerHeadings'>Add New Trainer</h2>
                <Grid container>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={8}>
                        <form className='trainerForm' onSubmit={this.addNewTrainer}>
                            <Grid container>
                                <Grid item xs={4}>
                                    <input className='lengthOfInputs' type='text' placeholder='First Name' value={this.state.newTrainer.first_name} onChange={this.handleChangeFor('first_name')} />
                                </Grid>
                                <Grid item xs={8}>
                                    <select id='stateDrop' className='lengthOfInputs' onChange={this.handleChangeForState('state')}>
                                        <option value="state">State</option>
                                        {stateListArray}
                                    </select>
                                </Grid>
                                <Grid item xs={4}>
                                    <input className='lengthOfInputs' type='text' placeholder='Last Name' value={this.state.newTrainer.last_name} onChange={this.handleChangeFor('last_name')} />
                                </Grid>
                                <Grid item xs={8}>
                                    <select id='SLODrop' className='lengthOfInputs' onChange={this.handleChangeForSLO('state_level_organization')}>
                                        <option value="">State Level Organization</option>
                                        {SLOListArray}
                                    </select>
                                </Grid>
                                <Grid item xs={4}>
                                    <input className='lengthOfInputs' type='text' placeholder='Title' value={this.state.newTrainer.title} onChange={this.handleChangeFor('title')} />
                                </Grid>
                                <Grid item xs={8}>
                                    <select id='cohortDrop' className='lengthOfInputs' onChange={this.handleChangeFor('cohort')}>
                                        <option value="">Cohort</option>
                                        {cohortListArray}
                                    </select>
                                </Grid>
                                <Grid item xs={4}>
                                    <input className='lengthOfInputs' type='text' placeholder='Email' value={this.state.newTrainer.email} onChange={this.handleChangeFor('email')} />
                                </Grid>
                                <Grid item xs={8}>
                                    <input type='submit' value='Submit'/>
                                </Grid>
                                <Grid item xs={12}>
                                    <input className='lengthOfInputs' type='text' placeholder='Phone Number' value={this.state.newTrainer.phone_number} onChange={this.handleChangeFor('phone_number')} />
                                </Grid>
                                <Grid item xs={12}>
                                    <input className='lengthOfInputs' type='text' placeholder='Organization' value={this.state.newTrainer.organization} onChange={this.handleChangeFor('organization')} />
                                </Grid>
                                <Grid item xs={12}>
                                    <input className='lengthOfInputs' type='text' placeholder='District' value={this.state.newTrainer.district} onChange={this.handleChangeFor('district')} />
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
                <h2 className='centerHeadings'>Recently Added</h2>
                {/* {recentListArray} */}
            </div>
        );
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(AddTrainer);