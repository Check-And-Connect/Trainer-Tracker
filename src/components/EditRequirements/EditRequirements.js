import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { NATIONAL_TRAINER_ACTIONS } from '../../redux/actions/nationalTrainerActions';
import { COHORT_ACTIONS } from "../../redux/actions/cohortActions";

import {
    TextField,
    withStyles,
    Button,
    Typography,
    Snackbar,
    Slide
} from '@material-ui/core';

const mapStateToProps = state => ({
    user: state.user,
    nationalTrainerReducer: state.nationalTrainerReducer,
    cohortReducer: state.cohortReducer
});

const styles = {
    textField: {
        margin: '0em 0em 0.5em 0em',
        width: "20em",
        textAlign: "center"
    },
    button: {
        margin: '0em 0em 0.5em 0em',
    }

}

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}

class EditRequirements extends Component {

    constructor(props) {
        super(props)
        // this.props.cohortReducer.requirements
        this.state = {
            requirements: [],
            editDetails: false,
            open: false,
            Transition: null
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: COHORT_ACTIONS.FETCH_REQUIREMENTS });
    }

    componentDidUpdate(prevProps) {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
        if (
            prevProps.cohortReducer.requirements.length === 0 &&
            this.props.cohortReducer.requirements.length !== 0
          ) {
            this.updateRequirementState();
        }
    }

    // handleChangeFor = (propertyName) => {
    //     return (event) => {
    //         this.setState({
    //             nationalTrainer: {
    //                 ...this.state.nationalTrainer,
    //                 [propertyName]: event.target.value
    //             }
    //         })
    //         this.setState({
    //             editDetails: true
    //         })
    //     }
    // }

    handleChangeFor = (req_ID, name, event) => {
        let allReqs = this.state.requirements;
    
        let getReqIndex = allReqs.findIndex(req => {
            console.log('req_ID', req_ID)
          return req.requirement_id === req_ID;
        });
        
        console.log ('event', event.target.value)
        allReqs[getReqIndex][name] = event.target.value;
        console.log ('allReqs', allReqs)
        this.setState({
            requirements: allReqs
        });
        this.setState({
            editDetails: true
        })
        
      };

    updateRequirementState = () => {
        let requirementAry = [];
    
        this.props.cohortReducer.requirements.forEach(requirement => {
    
          let newObject = {
            requirement_id: requirement.requirements_id,
            requirement_name: requirement.name
          };
          requirementAry.push(newObject);
        });
    
        this.setState({
            requirements: requirementAry
        });
      };

    saveNationalTrainer = Transition => () => {
        this.setState({
            editDetails: false
        })
        this.setState({
            open: true, Transition
        })
        this.props.dispatch({ type: NATIONAL_TRAINER_ACTIONS.UPDATE_NATIONAL_TRAINER, payload: this.state.nationalTrainer })
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        let content = null;
        let stateListArray = this.state.requirements.map((item, index) => {
            return <li key={index}><TextField
                        className={this.props.classes.textField}
                        value={item.requirement_name}
                        onChange={newName => this.handleChangeFor(item.requirement_id, "requirement_name", newName)}
                        margin="normal"
                    /></li>
        })
        if (this.props.user.userName && this.state.editDetails === false) {
            content = (
                <div>
                    <Typography className='centerHeadings' variant="display2">Edit Requirements</Typography>
                    <div className='centerHeadings'>
                        <ul>
                            {stateListArray}
                        </ul>
                    </div>    
                </div>
            );
        } else {
            content = (
                <div>
                    <Typography className='centerHeadings' variant="display2">Edit Requirements</Typography>
                    <div className='centerHeadings'>
                        <ul>
                            {stateListArray}
                        </ul>
                    </div>   
                    <div className='centerHeadings'>
                        <Button className={this.props.classes.button} variant="outlined" onClick={this.saveNationalTrainer(TransitionLeft)}>Save</Button>
                    </div>

                </div>
            );
        }
        return (
            <div>
                {content}
                <Snackbar
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={this.state.Transition}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Saved Successfully</span>}
                />
            </div>
        );
    }
}

const styleTrainer = withStyles(styles)(EditRequirements)
export default connect(mapStateToProps)(styleTrainer);