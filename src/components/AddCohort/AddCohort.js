import React, { Component } from "react";
import { connect } from "react-redux";

import { USER_ACTIONS } from "../../redux/actions/userActions";
import { COHORT_ACTIONS } from "../../redux/actions/cohortActions";
import { STATE_LEAD_ACTIONS } from "../../redux/actions/stateLeadActions";

import {
  withStyles,
  Typography,
  TextField,
  Button,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  TableRow,
  Table,
  TableHead,
  TableBody,
  TableCell
} from "@material-ui/core";

import MomentUtils from "material-ui-pickers/utils/moment-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import { InlineDatePicker } from "material-ui-pickers/DatePicker";
import moment from "moment";

const mapStateToProps = state => ({
  user: state.user,
  // localTrainerReducer: state.localTrainerReducer,
  cohortReducer: state.cohortReducer,
  stateLeadReducer: state.stateLeadReducer
});

const styles = theme => ({
  mainFormComponent: {
    display: "Grid",
    gridTemplateRows: "0.5fr 0.7fr 0.1fr",
    justifyContent: "center"
  },
  selectState: {
    width: "10em"
  },
  topPart: {
    textAlign: "center"
  },
  bottomPart: {
    textAlign: "center"
  },
  input: {
    width: "15em",
    textAlign: "center"
  },
  createButton: {
    textAlign: "center",
    marginTop: "1em",
    marginBottom: "2em"
  }
});
class AddCohort extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newCohort: {
        name: "",
        state: "",
        state_level_organization: "",
        note : "",
        requirements: []
      },
      chosenDate: moment().format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ'),
      errorMessage: ""
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({ type: COHORT_ACTIONS.FETCH_STATES });
    this.props.dispatch({ type: COHORT_ACTIONS.FETCH_REQUIREMENTS });
  }

  componentDidUpdate(prevProps) {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push("home");
    }

    if (
      prevProps.cohortReducer.requirements.length === 0 &&
      this.props.cohortReducer.requirements.length !== 0
    ) {
      this.updateRequirementState();
    }
  }

  updateRequirementState = () => {
    let requirementAry = [];

    this.props.cohortReducer.requirements.forEach(requirement => {
        if(requirement.requirements_id === 1) {

        
        console.log(moment(this.state.chosenDate).add(requirement.duration, 'day').format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ'));
        }
        
      let newObject = {
        requirement_id: requirement.requirements_id,
        requirement_name: requirement.name,
        due_date: moment(this.state.chosenDate)
          .add(requirement.duration, "day")
          .format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ'),
        notification_1_date: moment(this.state.chosenDate)
          .add(requirement.notification_1_time, "day")
          .format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ'),
        notification_2_date: moment(this.state.chosenDate)
          .add(requirement.notification_2_time, "day")
          .format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ')
      };
      requirementAry.push(newObject);
    });

    this.setState({
      newCohort: {
        ...this.state.newCohort,
        requirements: requirementAry
      }
    });
  };

  handleChangeFor = propertyName => {
    return event => {
      this.setState({
        newCohort: {
          ...this.state.newCohort,
          [propertyName]: event.target.value
        },
        errorMessage: ""
      });
    };
  };

  handleChangeForState = propertyName => {
    return event => {
      this.setState({
        newCohort: {
          ...this.state.newCohort,
          state_level_organization: "",
          [propertyName]: event.target.value
        },
        errorMessage: ""
      });
      this.props.dispatch({
        type: COHORT_ACTIONS.FETCH_FILTER_STATE,
        payload: event.target.value
      });
    };
  };

  handleChangeForSLO = propertyName => {
    return event => {
      this.setState({
        newCohort: {
          ...this.state.newCohort,
          [propertyName]: event.target.value
        },
        errorMessage: ""
      });
      this.props.dispatch({
        type: STATE_LEAD_ACTIONS.FILTER_STATE_LEAD,
        payload: event.target.value
      });
    };
  };

  handleInitialDate = date => {
    this.setState(
      {
        chosenDate: date.format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ')
      },
      () => {
        this.updateRequirementState();
      }
    );
  };

  handleDateChange = (req_ID, dateType, date) => {
    let allReqs = this.state.newCohort.requirements;

    let getReqIndex = allReqs.findIndex(req => {
      return req.requirement_id === req_ID;
    });

    allReqs[getReqIndex][dateType] = date;

    this.setState({
      newCohort: {
        ...this.state.newCohort,
        requirements: allReqs
      }
    });
  };

  createDueDates = () => {
    let tableBody = this.state.newCohort.requirements.map(
      (requirement, index) => {
        return (
          <TableRow key={index}>
            <TableCell>{requirement.requirement_name.toUpperCase()}</TableCell>
            <TableCell>
              <InlineDatePicker
                className={this.props.classes.dropDown}
                disabled={requirement.requirement_id === 1}
                keyboard
                format="MM/DD/YYYY"
                label="Due Date"
                value={this.state.newCohort.requirements[index].due_date}
                onChange={date =>
                  this.handleDateChange(
                    requirement.requirement_id,
                    "due_date",
                    date.format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ')
                  )
                }
              />
            </TableCell>

            <TableCell>
              <InlineDatePicker
                className={this.props.classes.dropDown}
                disabled={requirement.requirement_id === 1}
                keyboard
                format="MM/DD/YYYY"
                label="Notification 1"
                value={
                  this.state.newCohort.requirements[index].notification_1_date
                }
                onChange={date =>
                  this.handleDateChange(
                    requirement.requirement_id,
                    "notification_1_date",
                    date.format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ')
                  )
                }
              />
            </TableCell>

            <TableCell>
              <InlineDatePicker
                className={this.props.classes.dropDown}
                disabled={requirement.requirement_id === 1}
                keyboard
                format="MM/DD/YYYY"
                label="Notification 2"
                value={
                  this.state.newCohort.requirements[index].notification_2_date
                }
                onChange={date =>
                  this.handleDateChange(
                    requirement.requirement_id,
                    "notification_2_date",
                    date.format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ')
                  )
                }
              />
            </TableCell>
          </TableRow>
        );
      }
    );

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Requirement Name</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Notification 1 Date</TableCell>
            <TableCell>Notification 2 Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{tableBody}</TableBody>
      </Table>
    );
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.newCohort.name === "") {
      this.setState({
        errorMessage: "Please Enter the Cohort Name"
      });
    } else if (this.state.newCohort.state === "") {
      this.setState({
        errorMessage: "Please Pick a State"
      });
    } else if (this.state.newCohort.state_level_organization === "") {
      this.setState({
        errorMessage: "Please Pick a State Level Org."
      });
    } else {
      this.setState({
        errorMessage: ""
      });

      this.props.dispatch({
        type: COHORT_ACTIONS.ADD_NEW_COHORT,
        payload : this.state
      });
    }
  };

  render() {
    let { classes } = this.props;

    let stateListArray = this.props.cohortReducer.state_dropDown.map(
      (item, index) => {
        return (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        );
      }
    );
    let SLOListArray = this.props.cohortReducer.SLO_dropDown.map(
      (item, index) => {
        return (
          <MenuItem key={index} value={item.state_level_organization_id}>
            {item.name}
          </MenuItem>
        );
      }
    );

    let dueDateTabel =
      this.state.newCohort.requirements.length > 0 ? this.createDueDates() : [];

    console.log(this.state);
    let content = null;
    if (this.props.user.userName) {
      content = (
        <div className={classes.mainFormComponent}>
          <div className={classes.topPart}>
            <Typography variant="display2">Create New Cohort</Typography>

            <div>
              <TextField
                label="Cohort Name"
                className={classes.input}
                value={this.state.newCohort.name}
                onChange={this.handleChangeFor("name")}
                margin="normal"
              />
            </div>

            <div>
              <FormControl>
                <InputLabel>Select A State</InputLabel>
                <Select
                  value={this.state.newCohort.state}
                  className={classes.input}
                  onChange={this.handleChangeForState("state")}
                  required
                >
                  {stateListArray}
                </Select>
              </FormControl>
            </div>
            <br />
            <div>
              <FormControl>
                <InputLabel>Select A State Level Org</InputLabel>
                <Select
                  value={this.state.newCohort.state_level_organization}
                  className={classes.input}
                  onChange={this.handleChangeForSLO("state_level_organization")}
                  required
                >
                  {SLOListArray}
                </Select>
              </FormControl>
            </div>
            
            <div>
              <TextField
                label="Note"
                multiline
                rowsMax="4"
                className={classes.input}
                value={this.state.newCohort.note}
                onChange={this.handleChangeFor("note")}
                margin="normal"
              />
            </div>
            <br/>
            <div>
              <InlineDatePicker
                className={classes.input}
                keyboard
                format="MM/DD/YYYY"
                label="Initial TTT Workshop"
                value={this.state.chosenDate}
                onChange={this.handleInitialDate}
              />
            </div>
          </div>

          <div className={classes.bottomPart}>
            <br />
            <Typography variant="display1">Cohort Deadlines</Typography>
            {dueDateTabel}
          </div>
          <div className={classes.createButton}>
            <Button type="Submit" variant="outlined">
              Create Cohort
            </Button>
            <br />
            <Typography variant="subheading" color="error">
              {this.state.errorMessage}
            </Typography>
          </div>
        </div>
      );
    }

    console.log(moment(this.state.chosenDate).add(1 , 'day').toString());
    
    return (
      <div>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <form onSubmit={this.handleSubmit}>{content}</form>
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}

const styleCohort = withStyles(styles)(AddCohort);
export default connect(mapStateToProps)(styleCohort);
