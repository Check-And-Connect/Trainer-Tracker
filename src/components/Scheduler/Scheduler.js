import React, { Component } from "react";
import { connect } from "react-redux";
import {
  withStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from "@material-ui/core";
import { Typography } from "@material-ui/core";
import MomentUtils from "material-ui-pickers/utils/moment-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import { InlineDatePicker } from "material-ui-pickers/DatePicker";
import moment from "moment";

const mapStateToProps = state => ({
  cohort: state.cohortReducer
});

const styles = {
  dropDown: {
    width: "15em"
  },
  mainComponent: {
    textAlign : 'center',
    padding: "1em"
  },
  buttons: {
    padding: "1em 0em"
  },
  button: {
    textTransform: "none",
    margin: "0.1em"
  }
};

class Scheduler extends Component {
  state = {
    requirement_id: "",
    selectedDate: moment().format('ddd, DD MMM YYYY HH:mm:ss ZZ'),
    errorMessege: ""
  };

  handleChange = event => {
    console.log(event.target);
    this.setState({
      errorMessege: ""
    });
    this.setState({
      requirement_id: event.target.value
    });
  };

  handleDateChange = date => {
    console.log(date);
    this.setState({
      selectedDate: date.toISOString()
    });
  };

  handleMarkComplete = event => {
    event.preventDefault();
    if (this.state.requirement_id !== "") {
      this.props.handleMarkComplete({requirement_id : this.state.requirement_id, date_marked_complete : this.state.selectedDate});
      
    } else {
      this.setState({
        errorMessege: "Please choose a requirement before you mark complete."
      });
    }
  };

  handleScheduling = event => {
    event.preventDefault();
    if (this.state.requirement_id !== "") {

      this.props.handleScheduling({requirement_id : this.state.requirement_id, date_scheduled : this.state.selectedDate});
    } else {
      this.setState({
        errorMessege: "Please choose a requirement before you schedule."
      });
    }
  };

  render() {
    let { classes } = this.props;

    console.log(this.state);

    let requirements = this.props.cohort.requirements.map(requirement => {
      return (
        <MenuItem
          key={requirement.requirements_id}
          value={requirement.requirements_id}
        >
          {requirement.name}
        </MenuItem>
      );
    });

    return (
      <div className={classes.mainComponent}>
        <Typography>ACTION</Typography>
        <br/>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <form>
           
            <FormControl required={true} className={classes.formControl}>
              <InputLabel>Select A Requirement</InputLabel>
              <Select
                className={classes.dropDown}
                value={this.state.requirement_id}
                onChange={this.handleChange}
                required
              >
                {requirements}
              </Select>
              <br />
              <div className="picker">
                <InlineDatePicker
                  className={classes.dropDown}
                  keyboard
                  format="MM/DD/YYYY"
                  label="Pick Date"
                  value={this.state.selectedDate}
                  onChange={this.handleDateChange}
                />
              </div>
            </FormControl>
            <br />
            <div className={classes.buttons}>
              <Button
                type="submit"
                onClick={this.handleMarkComplete}
                variant="outlined"
                className={classes.button}
              >
                Mark Complete
              </Button>
              <Button
                type="submit"
                onClick={this.handleScheduling}
                variant="outlined"
                className={classes.button}
              >
                Schedule
              </Button>
            </div>
            {this.state.errorMessege !== "" && (
              <Typography variant="body1" color="error">
                {this.state.errorMessege}
              </Typography>
            )}
          </form>
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}

const componentWithStyle = withStyles(styles)(Scheduler);
export default connect(mapStateToProps)(componentWithStyle);
