import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
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
                state_lead: '',
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
        // this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: 'FETCH_STATE_LEVEL_ORG' });
        this.props.dispatch({ type: 'FETCH_STATE_LEAD' });
        this.props.dispatch({ type: 'FETCH_COHORTS' });
    }

    componentDidUpdate() {
        // if (!this.props.user.isLoading && this.props.user.userName === null) {
        //     this.props.history.push('home');
        // }
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
            this.props.dispatch({ type: 'FILTER_STATE', payload: event.target.value });
        }
    }

    // addLog = () => {
    //     this.props.dispatch({
    //         type: 'POST_LOG',
    //         payload: this.state.newLog
    //     })
    //     this.props.history.push('patientGraph');
    // }

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
                // first_name: '',
                // last_name: '',
                // title: '',
                // email: '',
                // phone_number: '',
                // organization: '',
                // district: '',
                // state: '',
                // state_level_organization: '',
                // state_lead: '',
                // cohort: ''
            }
        });
    }

    

    render() {
        let stateListArray = this.props.cohortReducer.state_and_SLO.map((item, index) => {
            return <option value={item.state}>{item.state}</option> 
        })
        let SLOListArray = this.props.cohortReducer.state_and_SLO.map((item, index) => {
            return <option value={item.name}>{item.name}</option> 
        })
        let stateLeadListArray = this.props.stateLeadReducer.state_lead.map((item, index) => {
            return <option value={item.state_lead_id}>{item.first_name} {item.last_name}</option> 
        })
        let cohortListArray = this.props.cohortReducer.trainer_cohorts.map((item, index) => {
            return <option value={item.cohort_id}>{item.name}</option> 
        })
        // let recentListArray = this.props.recentlyAdded.map((item, index) => {
        //     return <li>{item.first_name} {item.last_name}</li> 
        // })

        // let content = null;
        // if (this.props.user.userName) {
           let content = (
                <div>
                    {/* <Nav /> */}
                    <h2 className='centerHeadings'>Add New Trainer</h2>
                    <form onSubmit={this.addNewTrainer}>
                        <input type='text' placeholder='First Name' value={this.state.newTrainer.first_name} onChange={this.handleChangeFor('first_name')} />
                        <input type='text' placeholder='Last Name' value={this.state.newTrainer.last_name} onChange={this.handleChangeFor('last_name')} />
                        <input type='text' placeholder='Title' value={this.state.newTrainer.title} onChange={this.handleChangeFor('title')} />
                        <input type='text' placeholder='Email' value={this.state.newTrainer.email} onChange={this.handleChangeFor('email')} />
                        <input type='text' placeholder='Phone Number' value={this.state.newTrainer.phone_number} onChange={this.handleChangeFor('phone_number')} />
                        <input type='text' placeholder='Organization' value={this.state.newTrainer.organization} onChange={this.handleChangeFor('organization')} />
                        <input type='text' placeholder='District' value={this.state.newTrainer.district} onChange={this.handleChangeFor('district')} />
                        <select onChange={this.handleChangeForState('state')}>
                            <option value="">State</option>
                            {stateListArray}
                        </select>
                        <select onChange={this.handleChangeFor('state_level_organization')}>
                            <option value="state">State Level Organization</option>
                            {SLOListArray}
                        </select>
                        <select onChange={this.handleChangeFor('state_lead')}>
                            <option value="">State Lead</option>
                            {stateLeadListArray}
                        </select>
                        <select onChange={this.handleChangeFor('cohort')}>
                            <option value="">Cohort</option>
                            {cohortListArray}
                        </select>
                        <input type='submit' value='Submit' />
                    </form>
                    <h2 className='centerHeadings'>Recently Added</h2>
                    {/* {recentListArray} */}
                </div>
            );
        // } 

        return (
            <div>
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(AddTrainer);