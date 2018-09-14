import React, { Component } from "react";
import { connect } from "react-redux";
import {
  TextField,
  withStyles,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography
} from "@material-ui/core";

import { Link } from "react-router-dom";

import { NATIONAL_TRAINER_ACTIONS } from "../../redux/actions/nationalTrainerActions";

const mapStateToProps = state => ({
  user: state.user,
  nationalTrainer : state.nationalTrainerReducer
});

const styles = {};
class ResetPassword extends Component {
  state = {
    dialogOpen: false,
    password_1: "",
    password_2: "",
    errorMessage: "",
    emailConfirmed: false,
    passwordConfrimError: ""
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.nationalTrainer.passwordResetConfrimation.length === 0 &&
      this.props.nationalTrainer.passwordResetConfrimation.length !== 0
    ) {
      if (this.props.nationalTrainer.passwordResetConfrimation[0].error) {
        this.setState({
          passwordConfrimError: this.props.nationalTrainer
            .passwordResetConfrimation[0].error
        });
      } else if (
        this.props.nationalTrainer.passwordResetConfrimation[0].success
      ) {
        this.setState({
          dialogOpen: true
        });
      }
    }
  }

  handleChangeFor = property => event => {
    this.setState({
      errorMessage: "",
      [property]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let token = this.props.match.params.token;
    if (this.state.password_1 === "" || this.state.password_2 === "") {
      this.setState({
        errorMessage: "Please input a password before resetting"
      });
    } else if (this.state.password_1 !== this.state.password_2) {
      this.setState({
        errorMessage: "Password doesn't match"
      });
    } else {
      this.props.dispatch({
        type: NATIONAL_TRAINER_ACTIONS.RESET_PASSWORD,
        payload: { password: this.state.password_1, token: token }
      });
    }
  };

  render() {
    let { classes } = this.props;

    return (
      <div>
        <Typography variant="display1">Reset Your Password</Typography>

        <form onSubmit={this.handleSubmit}>
          <div>
            <div>
              <TextField
                type="password"
                label="Password"
                className={classes.input}
                value={this.state.password_1}
                onChange={this.handleChangeFor("password_1")}
                margin="normal"
              />
            </div>
            <div>
              <TextField
                type="password"
                label="Confirm Password"
                className={classes.input}
                value={this.state.password_2}
                onChange={this.handleChangeFor("password_2")}
                margin="normal"
              />
            </div>
            <div>
              <Button type="submit" variant="outlined">
                Reset
              </Button>
              <br />
              <Typography color="error" variant="body1">
                {this.state.errorMessage}
              </Typography>
            </div>
          </div>
        </form>

        <Dialog open={this.state.dialogOpen} onClose={this.handleClose}>
          <DialogContent>
            <DialogContentText>Password Reset Was Successful</DialogContentText>
            <DialogActions>
              <Link to="/home">
                <Button onClick={this.handleClose} variant="outlined">
                  Login
                </Button>
              </Link>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const componentWithStyle = withStyles(styles)(ResetPassword);
export default connect(mapStateToProps)(componentWithStyle);
