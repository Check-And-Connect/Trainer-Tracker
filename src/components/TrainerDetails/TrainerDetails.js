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
    },
    textField: {
        margin: '0em 0em 0.5em 1em',
        width: "14em"
    },
    dropDown: {
        width: "10em"
    },
    formControl: {
        margin: '0em 0em 0.5em 1em',
        width: "14em"
    },
    selectEmpty: {
        marginTop: '0em 0em 0.5em 1em' * 2,
    }
}

class TrainerDetails extends Component{
    constructor(props){
        super(props)
        this.state = {
            editingDetails: false,
            editingNotes: false,
            trainer: null,
            requirements: null,
            cohort: null,
            slo: null
        }
    }

    componentDidMount = () => {
        this.getTrainerDetails();
        this.props.dispatch({ type: COHORT_ACTIONS.FETCH_STATES });
        this.props.dispatch({ type: COHORT_ACTIONS.FETCH_COHORTS });
        this.props.dispatch({ type: COHORT_ACTIONS.FETCH_STATE_LEVEL_ORG });
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
        if (e.target.name === 'notes' && !this.state.editingNotes){
            this.setState({
                editingNotes: true
            })
        } else if (e.target.name !== 'notes' && !this.state.editingDetails){
            this.setState({
                editingDetails: true
            })
        }

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
                trainer: {
                    ...this.state.trainer,
                    cohort_ref_id: e.target.value
                },
                cohort: {
                    ...this.state.cohort,
                    cohort_id: e.target.value
                }
            })
            return;
        }
        this.setState({
            trainer: {
                ...this.state.trainer,
                [e.target.name]: e.target.value
            }
        })

    }

    handleIconClick = () => {
        if (this.state.editingDetails || this.state.editingNotes){
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
            editingDetails: false,
            editingNotes: false
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

        let fnameField, lnameField, titleField, emailField, phoneField, organizationField, districtField, notesField;
        let stateField, sloField, cohortField;

        if (this.state.trainer !== null && this.state.slo !== null && this.state.cohort !== null){
                fnameField = <TextField 
                                className={this.props.classes.textField}
                                label="First Name" 
                                type="text" 
                                name="first_name" 
                                placeholder="first name" 
                                value={this.state.trainer.first_name} 
                                onChange={this.handleInputChange}
                            />
                lnameField = <TextField 
                                className={this.props.classes.textField}
                                label="Last Name" 
                                type="text" 
                                name="last_name" 
                                placeholder="last name" 
                                value={this.state.trainer.last_name} 
                                onChange={this.handleInputChange}
                            />
                titleField = <TextField 
                                className={this.props.classes.textField}
                                label="Title" 
                                type="text" 
                                name="title" 
                                placeholder="title" 
                                value={this.state.trainer.title} 
                                onChange={this.handleInputChange}
                            />
                emailField = <TextField 
                                className={this.props.classes.textField}
                                label="Email Address" 
                                type="text" 
                                name="email" 
                                placeholder="email" 
                                value={this.state.trainer.email} 
                                onChange={this.handleInputChange}
                            />
                phoneField = <TextField 
                                className={this.props.classes.textField}
                                label="Phone Number" 
                                type="text" 
                                name="phone_number" 
                                placeholder="phone number" 
                                value={this.state.trainer.phone_number} 
                                onChange={this.handleInputChange}
                            />
                organizationField = <TextField 
                                        className={this.props.classes.textField}
                                        label="Organization" 
                                        type="text" 
                                        name="organization" 
                                        placeholder="organization" 
                                        value={this.state.trainer.organization} 
                                        onChange={this.handleInputChange}
                                    />
                districtField = <TextField 
                                    className={this.props.classes.textField}
                                    label="District" 
                                    type="text" 
                                    name="district" 
                                    placeholder="district" 
                                    value={this.state.trainer.district} 
                                    onChange={this.handleInputChange}
                                />
                notesField = <textarea 
                                rows="10" 
                                cols="100" 
                                type="text" 
                                name="notes" 
                                placeholder="notes" 
                                value={this.state.trainer.notes} 
                                onChange={this.handleInputChange}>
                            </textarea>
                stateField = <span>
                                <InputLabel>
                                    State
                                </InputLabel>
                                <Select 
                                    className={this.props.classes.formControl}
                                    label="State" 
                                    value={this.state.slo.state} 
                                    name="state" 
                                    onChange={this.handleInputChange}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {stateListArray}
                                </Select>
                            </span>
                sloField = <span>
                                <InputLabel>
                                    State-Level Org.
                                </InputLabel>
                                <Select 
                                    className={this.props.classes.formControl}
                                    label="State-Level Org." 
                                    value={this.state.slo.state_level_organization_id} 
                                    name="slo" 
                                    onChange={this.handleInputChange}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {sloListArray}
                                </Select>
                            </span>
                cohortField = <span>
                                <InputLabel>
                                    Cohort
                                </InputLabel>
                                <Select 
                                    className={this.props.classes.formControl}
                                    label="Cohort" 
                                    value={this.state.cohort.cohort_id} 
                                    name="cohort" 
                                    onChange={this.handleInputChange}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {cohortListArray}
                                </Select>
                                </span>
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

        let detailsButtonArea = null;
        if (this.state.editingDetails){
            detailsButtonArea = <Button onClick={this.handleIconClick}>{this.state.editingDetails ? "Save Changes" : ""}</Button>
        }

        let notesButtonArea = null;
        if (this.state.editingNotes){
            notesButtonArea = <Button onClick={this.handleIconClick}>{this.state.editingNotes ? "Save Changes" : ""}</Button>
        }

        return(
            <React.Fragment>
            <div>
                    <h2 className='centerHeadings'>Trainer Details{detailsButtonArea}</h2>
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
                                            {stateField}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        {lnameField}
                                    </Grid>
                                    <Grid item xs={8}>
                                        <FormControl className={this.props.classes.formControl}>
                                            {sloField}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        {titleField}
                                    </Grid>
                                    <Grid item xs={8}>
                                        <FormControl className={this.props.classes.formControl}>
                                            {cohortField}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {emailField}
                                    </Grid>

                                    <Grid item xs={12}>
                                        {phoneField}
                                    </Grid>
                                    <Grid item xs={12}>
                                        {organizationField}
                                    </Grid>
                                    <Grid item xs={5}>
                                        {districtField}
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                    <h2 className='centerHeadings'>Notes{notesButtonArea}</h2>
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