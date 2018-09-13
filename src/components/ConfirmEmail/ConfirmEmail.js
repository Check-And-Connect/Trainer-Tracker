import React, { Component } from "react";
import { connect } from "react-redux";

import { NATIONAL_TRAINER_ACTIONS } from "../../redux/actions/nationalTrainerActions";
import {
  TextField,
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography
} from "@material-ui/core";

const mapStateToProps = state => ({
  nationalTrainer: state.nationalTrainerReducer
});

const styles = {};
class ConfirmEmail extends Component {
  state = {
    email: "",
    errorMessage: "",
    emailConfirmed: false,
    dialogOpen: false,
    confrimedEmail: ""
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.nationalTrainer.emailConfirmation.length === 0 &&
      this.props.nationalTrainer.emailConfirmation.length !== 0
    ) {
      this.checkEmailValidity();
    }
  }

  checkEmailValidity = () => {
    if (this.props.nationalTrainer.emailConfirmation[0].email !== "") {
      this.setState({
        dialogOpen: true,
        confrimedEmail: this.props.nationalTrainer.emailConfirmation[0].email
      });
    } else {
      this.setState({
        errorMessage: "Incorrect Email"
      });
    }
  };
  handleChangeFor = property => event => {
    this.setState({
      errorMessage: "",
      [property]: event.target.value
    });
  };

  handleClose = () => {
    this.setState({
      dialogOpen: false
    });
    this.props.dispatch({
      type: NATIONAL_TRAINER_ACTIONS.REQUEST_PASSWORD_RESET,
      payload: { email: this.state.confrimedEmail }
    });
  };

  confirmEmail = () => {
    if (this.state.email === "") {
      this.setState({
        errorMessage: "Please Enter Your Email Before Proceeding"
      });
    } else {
      this.props.dispatch({
        type: NATIONAL_TRAINER_ACTIONS.CONFIRM_EMAIL,
        payload: this.state.email
      });
    }
  };

  render() {
    let { classes } = this.props;

    return (
      <div>
        <Typography variant="display1">Confirm Your Email</Typography>
        <div>
          <TextField
            label="Email"
            className={classes.input}
            value={this.state.email}
            onChange={this.handleChangeFor("email")}
            margin="normal"
            helperText="Please Enter Your Email"
          />
          <br />
          <Button onClick={this.confirmEmail} variant="outlined">
            Enter
          </Button>
          <Typography color="error" variant="body1">
            {this.state.errorMessage}
          </Typography>
        </div>
        <Dialog open={this.state.dialogOpen} onClose={!this.state.dialogOpen}>
          <DialogTitle>Your Email Is Confirmed</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please click the button below to request a password reset. An
              email will be sent to you with a link to reset your password.
            </DialogContentText>
            <DialogActions>
              <Button onClick={this.handleClose} variant="outlined">
                Reset Password
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const componentWithStyle = withStyles(styles)(ConfirmEmail);
export default connect(mapStateToProps)(componentWithStyle);
