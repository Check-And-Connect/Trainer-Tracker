import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { NATIONAL_TRAINER_ACTIONS } from '../../redux/actions/nationalTrainerActions';

import axios from 'axios';

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
    nationalTrainerReducer: state.nationalTrainerReducer
});

const styles = {
    textField: {
        margin: '0em 0em 0.5em 0em',
        width: "12em",
        textAlign: "center"
    },
    button: {
        margin: '0em 0em 0.5em 0em',
    }

}

function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
  }

class AccountDetails extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nationalTrainer: {
                first_name: '',
                last_name: '',
                title: '',
                email: ''
            },
            editDetails: false,
            open: false,
            Transition: null
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });

        axios.get(`api/nationalTrainers/getNTDetails`)
            .then(res => {
                this.setState({
                    nationalTrainer: {
                        ...this.state.nationalTrainer,
                        first_name: res.data.first_name,
                        last_name: res.data.last_name,
                        title: res.data.title,
                        email: res.data.email
                    }
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    handleChangeFor = (propertyName) => {
        return (event) => {
            this.setState({
                nationalTrainer: {
                    ...this.state.nationalTrainer,
                    [propertyName]: event.target.value
                }
            })
            this.setState({
                editDetails: true
            })
        }
    }

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
        if (this.props.user.userName && this.state.editDetails === false) {
            content = (
                <div>
                    <Typography className='centerHeadings' variant="display2">Account Details</Typography>
                    <div className='centerHeadings'>
                        <TextField
                            className={this.props.classes.textField}
                            label="First Name"
                            value={this.state.nationalTrainer.first_name}
                            onChange={this.handleChangeFor('first_name')}
                            margin="normal"
                        />
                    </div>
                    <div className='centerHeadings'>
                        <TextField
                            className={this.props.classes.textField}
                            label="Last Name"
                            value={this.state.nationalTrainer.last_name}
                            onChange={this.handleChangeFor('last_name')}
                            margin="normal"
                        />
                    </div>
                    <div className='centerHeadings'>
                        <TextField
                            className={this.props.classes.textField}
                            label="Title"
                            value={this.state.nationalTrainer.title}
                            onChange={this.handleChangeFor('title')}
                            margin="normal"
                        />
                    </div>
                    <div className='centerHeadings'>
                        <TextField
                            className={this.props.classes.textField}
                            label="Email"
                            value={this.state.nationalTrainer.email}
                            onChange={this.handleChangeFor('email')}
                            margin="normal"
                        />
                    </div>
                </div>
            );
        } else {
            content = (
                <div>
                    <Typography className='centerHeadings' variant="display2">Account Details</Typography>
                    <div className='centerHeadings'>
                        <TextField
                            className={this.props.classes.textField}
                            label="First Name"
                            value={this.state.nationalTrainer.first_name}
                            onChange={this.handleChangeFor('first_name')}
                            margin="normal"
                        />
                    </div>
                    <div className='centerHeadings'>
                        <TextField
                            className={this.props.classes.textField}
                            label="Last Name"
                            value={this.state.nationalTrainer.last_name}
                            onChange={this.handleChangeFor('last_name')}
                            margin="normal"
                        />
                    </div>
                    <div className='centerHeadings'>
                        <TextField
                            className={this.props.classes.textField}
                            label="Title"
                            value={this.state.nationalTrainer.title}
                            onChange={this.handleChangeFor('title')}
                            margin="normal"
                        />
                    </div>
                    <div className='centerHeadings'>
                        <TextField
                            className={this.props.classes.textField}
                            label="Email"
                            value={this.state.nationalTrainer.email}
                            onChange={this.handleChangeFor('email')}
                            margin="normal"
                        />
                    </div>
                    <div className='centerHeadings'>
                        <Button className={this.props.classes.button} variant="outlined" onClick={this.saveNationalTrainer(TransitionRight)}>Save</Button>
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

const styleTrainer = withStyles(styles)(AccountDetails)
export default connect(mapStateToProps)(styleTrainer);