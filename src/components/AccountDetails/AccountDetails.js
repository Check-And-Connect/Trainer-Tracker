import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { NATIONAL_TRAINER_ACTIONS } from '../../redux/actions/nationalTrainerActions';

import { Edit, Save } from '@material-ui/icons';

import axios from 'axios';

import {
    TextField,
    withStyles,
    Grid,
    Button,
    Divider,
    InputLabel
} from '@material-ui/core';

const mapStateToProps = state => ({
    user: state.user,
    nationalTrainerReducer: state.nationalTrainerReducer
});

const styles = {
    textField: {
        margin: '0em 0em 0.5em 0em',
        width: "14em"
    }
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
            editDetails: false
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        // this.props.dispatch({ type: NATIONAL_TRAINER_ACTIONS.FETCH_ONE_NATIONAL_TRAINER });

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

    saveNationalTrainer = () => {
        this.setState({
            editDetails: false
        })
        this.props.dispatch({ type: NATIONAL_TRAINER_ACTIONS.UPDATE_NATIONAL_TRAINER, payload: this.state.nationalTrainer })
    }

    render() {
        let content = null;
        if (this.props.user.userName && this.state.editDetails === false) {
            content = (
                <div>
                    <Grid container>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={5}></Grid>
                        <Grid item xs={4}>
                            <h2>Account Details</h2>
                        </Grid>
                        <Grid item xs={3}></Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={5}></Grid>
                        <Grid item xs={4}>
                            <TextField
                                className={this.props.classes.textField}
                                label="First Name"
                                value={this.state.nationalTrainer.first_name}
                                onChange={this.handleChangeFor('first_name')}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={3}></Grid>

                        <Grid item xs={5}></Grid>
                        <Grid item xs={4}>
                            <TextField
                                className={this.props.classes.textField}
                                label="Last Name"
                                value={this.state.nationalTrainer.last_name}
                                onChange={this.handleChangeFor('last_name')}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={3}></Grid>

                        <Grid item xs={5}></Grid>
                        <Grid item xs={4}>
                            <TextField
                                className={this.props.classes.textField}
                                label="Title"
                                value={this.state.nationalTrainer.title}
                                onChange={this.handleChangeFor('title')}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={3}></Grid>

                        <Grid item xs={5}></Grid>
                        <Grid item xs={4}>
                            <TextField
                                className={this.props.classes.textField}
                                label="Email"
                                value={this.state.nationalTrainer.email}
                                onChange={this.handleChangeFor('email')}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={3}></Grid>
                    </Grid>
                </div>
            );
        } else {
            content = (
                <div>
                    <Grid container>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={5}></Grid>
                        <Grid item xs={3}>
                            <h2>Account Details</h2>
                        </Grid>
                        <Grid item xs={4}>
                            <h2>
                                <Button variant="raised" onClick={this.saveNationalTrainer}>Save Changes</Button>
                            </h2>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={5}></Grid>
                        <Grid item xs={4}>
                            <TextField
                                className={this.props.classes.textField}
                                label="First Name"
                                value={this.state.nationalTrainer.first_name}
                                onChange={this.handleChangeFor('first_name')}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={3}></Grid>

                        <Grid item xs={5}></Grid>
                        <Grid item xs={4}>
                            <TextField
                                className={this.props.classes.textField}
                                label="Last Name"
                                value={this.state.nationalTrainer.last_name}
                                onChange={this.handleChangeFor('last_name')}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={3}></Grid>

                        <Grid item xs={5}></Grid>
                        <Grid item xs={4}>
                            <TextField
                                className={this.props.classes.textField}
                                label="Title"
                                value={this.state.nationalTrainer.title}
                                onChange={this.handleChangeFor('title')}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={3}></Grid>

                        <Grid item xs={5}></Grid>
                        <Grid item xs={4}>
                            <TextField
                                className={this.props.classes.textField}
                                label="Email"
                                value={this.state.nationalTrainer.email}
                                onChange={this.handleChangeFor('email')}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={3}></Grid>
                    </Grid>
                </div>
            );
        }








        // <div>
        //     <h2 className='centerHeadings'>Account Details</h2>
        //     <Grid container>
        //         <Grid item xs={3}></Grid>
        //         <Grid item xs={9}>
        //             <form className='trainerForm'>
        //                 <Grid container>
        //                     <Grid item xs={4}>
        //                         <TextField
        //                             className={this.props.classes.textField}
        //                             label="First Name"
        //                             // value={this.state.newTrainer.first_name}
        //                             onChange={this.handleChangeFor('first_name')}
        //                             margin="normal"
        //                         />
        //                     </Grid>
        //                     <Grid item xs={5}>
        //                         <TextField
        //                             className={this.props.classes.textField}
        //                             label="District"
        //                             // value={this.state.newTrainer.district}
        //                             onChange={this.handleChangeFor('district')}
        //                             margin="normal"
        //                         />
        //                     </Grid>
        //                     <Grid item xs={7}>
        //                         <Button variant="raised" onClick={this.addNewTrainer}>Submit</Button>
        //                     </Grid>
        //                 </Grid>
        //             </form>
        //         </Grid>
        //     </Grid>
        // </div>


        return (
            <div>
                {content}
            </div>
        );
    }
}

const styleTrainer = withStyles(styles)(AccountDetails)
export default connect(mapStateToProps)(styleTrainer);