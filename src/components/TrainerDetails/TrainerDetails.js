import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios'
import {COHORT_ACTIONS} from '../../redux/actions/cohortActions';

import TrainerHistoryStepper from '../TrainerHistoryStepper/TrainerHistoryStepper';

import {withStyles, Button, TextField, Select, MenuItem, Grid, FormControl, InputLabel} from '@material-ui/core';

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
        this.getTrainerDetails();
    }

    getTrainerDetails = () => {
        let localTrainerID = this.props.match.params.id;
        axios.get(`/api/localTrainers/${localTrainerID}`)
            .then(res => {
                this.setState({
                    trainer: res.data.trainer,
                    requirements: res.data.requirements,
                    cohort: res.data.cohort,
                    slo: res.data.slo,
                })
                this.props.dispatch({ type: COHORT_ACTIONS.FETCH_FILTER_STATE, payload: res.data.slo.state });
                this.props.dispatch({ type: COHORT_ACTIONS.FETCH_FILTER_SLO, payload: res.data.slo.state_level_organization_id})            
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleInputChange = (e) => {
        console.log(e.target.name, e.target.value);
        if (e.target.name === 'state'){
            this.props.dispatch({ type: COHORT_ACTIONS.FETCH_FILTER_STATE, payload: e.target.value });
            this.setState({
                slo: {
                    ...this.state.slo,
                    state: e.target.value,
                    state_level_organization_id: 0
                },
                cohort: {
                    ...this.state.cohort,
                    cohort_id: 0
                }
            })

            return;
        } else if (e.target.name === 'slo'){
            this.props.dispatch({ type: COHORT_ACTIONS.FETCH_FILTER_SLO, payload: e.target.value})
            this.setState({
                slo: {
                    ...this.state.slo,
                    state_level_organization_id: e.target.value
                },
                cohort: {
                    ...this.state.cohort,
                    cohort_id: 0
                }
            })
            return;
        }  else if (e.target.name === 'cohort'){
            this.setState({
                cohort: {
                    ...this.state.cohort,
                    cohort_id: e.target.value
                }
            })
        }
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
                    this.getTrainerDetails();
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
                    <MenuItem key={index} value={cohort.cohort_id}>{cohort.name}</MenuItem>
                )
            })
            sloListArray = this.props.cohortReducer.SLO_dropDown.map((slo, index) => {
                return(
                    <MenuItem key={index} value={slo.state_level_organization_id}>{slo.name}</MenuItem>
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
        let stateField;
        let sloField;
        let cohortField;
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
            stateField = <span>{this.state.slo.state}</span>
            sloField = <span>{this.state.slo.name}</span>
            cohortField = <span>{this.state.cohort.name}</span>
            notesField = <span>{this.state.trainer.notes}</span>
            if (this.state.editing){

                fnameField = <TextField label="First Name" type="text" name="first_name" placeholder="first name" value={this.state.trainer.first_name} onChange={this.handleInputChange}/>
                lnameField = <TextField label="Last Name" type="text" name="last_name" placeholder="last name" value={this.state.trainer.last_name} onChange={this.handleInputChange}/>
                titleField = <TextField label="Title" type="text" name="title" placeholder="title" value={this.state.trainer.title} onChange={this.handleInputChange}/>
                emailField = <TextField label="Email Address" type="text" name="email" placeholder="email" value={this.state.trainer.email} onChange={this.handleInputChange}/>
                phoneField = <TextField label="Phone Number" type="text" name="phone_number" placeholder="phone number" value={this.state.trainer.phone_number} onChange={this.handleInputChange}/>
                organizationField = <TextField label="Organization" type="text" name="organization" placeholder="organization" value={this.state.trainer.organization} onChange={this.handleInputChange}/>
                districtField = <TextField label="District" type="text" name="district" placeholder="district" value={this.state.trainer.district} onChange={this.handleInputChange}/>
                notesField = <textarea rows="10" cols="100" type="text" name="notes" placeholder="notes" value={this.state.trainer.notes} onChange={this.handleInputChange}></textarea>
                stateField = <span><InputLabel>State</InputLabel><Select label="State" value={this.state.slo.state} name="state" onChange={this.handleInputChange}><MenuItem value=""><em>None</em></MenuItem>{stateListArray}</Select></span>
                sloField = <span><InputLabel>State-Level Org.</InputLabel><Select label="State-Level Org." value={this.state.slo.state_level_organization_id} name="slo" onChange={this.handleInputChange}><MenuItem value=""><em>None</em></MenuItem>{sloListArray}</Select></span>
                cohortField = <span><InputLabel>Cohort</InputLabel><Select label="Cohort" value={this.state.cohort.cohort_id} name="cohort" onChange={this.handleInputChange}><MenuItem value=""><em>None</em></MenuItem>{cohortListArray}</Select></span>
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
            <div>
                    <h2 className='centerHeadings'>Trainer Details<Button onClick={this.handleIconClick}>{this.state.editing ? "Save" : "Edit"}</Button></h2>
                    <Grid container>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={9}>
                            <form className='trainerForm'>
                                <Grid container>
                                    <Grid item xs={4}>
                                        {fnameField}
                                    </Grid>
                                    <Grid item xs={8}>
                                        <FormControl className={this.props.classes.formControl}>
                                        {/* <InputLabel>State</InputLabel> */}
                                            {stateField}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                    {/* <InputLabel>Last Name</InputLabel> */}
                                        {lnameField}
                                    </Grid>
                                    <Grid item xs={8}>
                                        <FormControl className={this.props.classes.formControl}>
                                            {/* <InputLabel>State Level Organization</InputLabel> */}
                                            {sloField}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                    {/* <InputLabel>Title</InputLabel> */}
                                        {titleField}
                                    </Grid>
                                    <Grid item xs={8}>
                                        <FormControl className={this.props.classes.formControl}>
                                            {/* <InputLabel>Cohort</InputLabel> */}
                                            {cohortField}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                    {/* <InputLabel>Email</InputLabel> */}
                                        {emailField}
                                    </Grid>
                                    <Grid item xs={12}>
                                    {/* <InputLabel>Phone Number</InputLabel> */}
                                        {phoneField}
                                    </Grid>
                                    <Grid item xs={12}>
                                    {/* <InputLabel>Organization</InputLabel> */}
                                        {organizationField}
                                    </Grid>
                                    <Grid item xs={5}>
                                    {/* <InputLabel>District</InputLabel> */}
                                        {districtField}
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                    <h2 className='centerHeadings'>Notes</h2>
                    <Grid container>
                    <Grid item xs={3}></Grid>
                        <Grid item xs={6}>
                            {notesField}
                        </Grid>
                    </Grid>
                    <h2 className='centerHeadings'>History</h2>
                    <Grid container>
                    <Grid item xs={3}></Grid>
                        <Grid item xs={9}>
                            <TrainerHistoryStepper requirements={this.state.requirements} />                            
                        </Grid>
                    </Grid>
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