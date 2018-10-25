import React, { Component } from "react";
import { connect } from "react-redux";

import { USER_ACTIONS } from "../../redux/actions/userActions";
import { COHORT_ACTIONS } from "../../redux/actions/cohortActions";

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
  TableCell,
  Slide,
  Snackbar,
  IconButton
} from "@material-ui/core";

import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

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

function TransitionRight(props) {
  return <Slide {...props} direction="left" />;
}

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
  },
  cyclePicker: {
    display: "Grid",
    gridTemplateColumns: "0fr 0.01fr 0fr",
    justifyContent: "center",
    alignItems: "center"
  },
  arrows: {
    fontSize: "2em"
  },
  cycleDisplayed: {
    fontSize: "1.5em"
  }
});

class CohortDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cohortInState: {
        cohort_id: "",
        name: "",
        state: "",
        state_level_organization: "",
        note: "",
        cycle: "",
        requirements: {}
      },
      chosenDate: moment().format("YYYY-MM-DD[T]HH:mm:ss.SSSZZ"),
      errorMessage: "",
      snackOpen: false,
      editMode: false,
      cycleDisplayed: "",
      currentCycleRequirements: []
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({ type: COHORT_ACTIONS.FETCH_STATES });
    this.props.dispatch({ type: COHORT_ACTIONS.FETCH_REQUIREMENTS });
    this.props.dispatch({
      type: COHORT_ACTIONS.FETCH_COHORT_SINGLE,
      payload: this.props.match.params
    });
  }

  componentDidUpdate(prevProps) {
    // This If clause kicks off an infinite loop of some kind if the user tries to log out from this page.
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push("home");
    }

    if (
      prevProps.cohortReducer.singleCohort.length === 0 &&
      this.props.cohortReducer.singleCohort.length !== 0
    ) {
      this.setState(
        {
          cohortInState: {
            ...this.state.cohortInState,
            cohort_id: this.props.cohortReducer.singleCohort[0].cohort_id,
            name: this.props.cohortReducer.singleCohort[0].cohort_name,
            start_date: this.props.cohortReducer.singleCohort[0].start_date,
            note: this.props.cohortReducer.singleCohort[0].note,
            state: this.props.cohortReducer.singleCohort[0].state,
            state_level_organization: this.props.cohortReducer.singleCohort[0]
              .state_level_org_id,
            cycle: this.props.cohortReducer.singleCohort[0].cycle,
            requirements: this.props.cohortReducer.singleCohort[0].requirements
          },
          cycleDisplayed: this.props.cohortReducer.singleCohort[0].cycle
        },
        () => {
          console.log(
            this.state.cohortInState.requirements[this.state.cycleDisplayed]
          );

          this.setState({
            currentCycleRequirements: this.state.cohortInState.requirements[
              this.state.cycleDisplayed
            ]
          });
        }
      );

      this.props.dispatch({
        type: COHORT_ACTIONS.FETCH_FILTER_STATE,
        payload: this.props.cohortReducer.singleCohort[0].state
      });
    }

    if (
      prevProps.cohortReducer.taskConfirmer.cohort_updated === false &&
      this.props.cohortReducer.taskConfirmer.cohort_updated === true
    ) {
      this.setState({
        snackOpen: true,
        editMode : false
      });
    }
  }

  handleChangeFor = propertyName => {
    return event => {
      this.setState({
        editMode: true
      });
      this.setState({
        cohortInState: {
          ...this.state.cohortInState,
          [propertyName]: event.target.value
        },
        errorMessage: ""
      });
    };
  };

  handleChangeForState = propertyName => {
    return event => {
      this.setState({
        editMode: true
      });
      this.setState({
        cohortInState: {
          ...this.state.cohortInState,
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
        editMode: true
      });
      this.setState({
        cohortInState: {
          ...this.state.cohortInState,
          [propertyName]: event.target.value
        },
        errorMessage: ""
      });
      this.props.dispatch({
        type: COHORT_ACTIONS.FETCH_LATEST_COHORT,
        payload: event.target.value
      });
    };
  };

  handleDateChange = (req_ID, dateType, date, cycle) => {
    this.setState({
      editMode: true
    });
    let requirementAry = this.state.cohortInState.requirements[cycle];

    let getReqIndex = requirementAry.findIndex(req => {
      return req.requirement_id === req_ID;
    });

    requirementAry[getReqIndex][dateType] = date;

    this.setState({
      cohortInState: {
        ...this.state.cohortInState,
        requirements: {
          ...this.state.cohortInState.requirements,
          [cycle]: requirementAry
        }
      }
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.dispatch({
      type: COHORT_ACTIONS.UPDATE_COHORT,
      payload: {
        ...this.props.match.params,
        cohort_info: this.state.cohortInState
      }
    });
  };

  previousCycle = () => {
    let prevCycle = parseInt(this.state.cycleDisplayed) -1;
    
    let reqs = this.state.cohortInState.requirements[prevCycle].sort((a , b) => {
      return a.requirement_id - b.requirement_id
    })

    this.setState({
      cycleDisplayed : prevCycle,
      currentCycleRequirements : reqs
    })
  }

  nextCycle = () => {
    let nextCycle = parseInt(this.state.cycleDisplayed) + 1;

    let reqs = this.state.cohortInState.requirements[nextCycle].sort((a , b) => {
      return a.requirement_id - b.requirement_id
    })

    this.setState({
      cycleDisplayed : nextCycle,
      currentCycleRequirements : reqs
    })
  }

  handleClose = () => {
    this.setState({ snackOpen: false });
  };

  
  createDueDates = () => {
    let tableBody = this.state.currentCycleRequirements.map(
      (requirement, index) => {

        return (
          <TableRow key={index}>
            <TableCell>{requirement.requirement_name.toUpperCase()}</TableCell>
            <TableCell>
              <InlineDatePicker
                className={this.props.classes.dropDown}
                keyboard
                format="MM/DD/YYYY"
                label="Due Date"
                value={
                  this.state.cohortInState.requirements[
                    this.state.cycleDisplayed
                  ][index].due_date
                }
                onChange={date =>
                  this.handleDateChange(
                    requirement.requirement_id,
                    "due_date",
                    date.format("YYYY-MM-DD[T]HH:mm:ss.SSSZZ"),
                    requirement.cycle
                  )
                }
              />
            </TableCell>

            <TableCell>
              <InlineDatePicker
                className={this.props.classes.dropDown}
                keyboard
                format="MM/DD/YYYY"
                label="Notification 1"
                value={
                  this.state.cohortInState.requirements[
                    this.state.cycleDisplayed
                  ][index].notification_1_date
                }
                onChange={date =>
                  this.handleDateChange(
                    requirement.requirement_id,
                    "notification_1_date",
                    date.format("YYYY-MM-DD[T]HH:mm:ss.SSSZZ"),
                    requirement.cycle
                  )
                }
              />
            </TableCell>

            <TableCell>
              <InlineDatePicker
                className={this.props.classes.dropDown}
                keyboard
                format="MM/DD/YYYY"
                label="Notification 2"
                value={
                  this.state.cohortInState.requirements[
                    this.state.cycleDisplayed
                  ][index].notification_2_date
                }
                onChange={date =>
                  this.handleDateChange(
                    requirement.requirement_id,
                    "notification_2_date",
                    date.format("YYYY-MM-DD[T]HH:mm:ss.SSSZZ"),
                    requirement.cycle
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
      this.state.cohortInState.requirements !== {} ? this.createDueDates() : [];

    let content = null;
    if (this.props.user.userName) {
      content = (
        <div className={classes.mainFormComponent}>
          <div className={classes.topPart}>
            <Typography variant="display2">Cohort Details</Typography>

            <div>
              <FormControl>
                <InputLabel>Select A State</InputLabel>
                <Select
                  value={this.state.cohortInState.state}
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
                  value={this.state.cohortInState.state_level_organization}
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
                label="Cohort Name"
                className={classes.input}
                value={this.state.cohortInState.name}
                onChange={this.handleChangeFor("name")}
                margin="normal"
              />
            </div>

            <div>
              <TextField
                label="Note"
                multiline
                rowsMax="4"
                className={classes.input}
                value={this.state.cohortInState.note}
                onChange={this.handleChangeFor("note")}
                margin="normal"
              />
            </div>
            <br />
            <div>
              <Typography variant="title">
                {" "}
                Current Cohort Cycle : {this.state.cohortInState.cycle}{" "}
              </Typography>
            </div>
            <br />
          </div>

          <div className={classes.bottomPart}>
            <br />
            <Typography variant="display1">Cohort Deadlines</Typography>
            <br />
            <p>Cycle</p>
            <div className={classes.cyclePicker}>
              <IconButton disabled={parseInt(this.state.cycleDisplayed) === 1} onClick={this.previousCycle}>
                <KeyboardArrowLeft className={classes.arrows} />
              </IconButton>
              <p className={classes.cycleDisplayed}>
                {this.state.cycleDisplayed}
              </p>
              <IconButton
                disabled={
                  parseInt(this.state.cycleDisplayed) ===
                  parseInt(this.state.cohortInState.cycle)
                }
                onClick={this.nextCycle}
              >
                <KeyboardArrowRight className={classes.arrows} />
              </IconButton>
            </div>
            {dueDateTabel}
          </div>
          <div className={classes.createButton}>
            {this.state.editMode && (
              <Button type="Submit" variant="outlined">
                Update Cohort
              </Button>
            )}
            <br />
            <Typography variant="subheading" color="error">
              {this.state.errorMessage}
            </Typography>
            <Snackbar
              open={this.state.snackOpen}
              onClose={this.handleClose}
              TransitionComponent={TransitionRight}
              message={<span> Cohort Updated </span>}
            />
          </div>
        </div>
      );
    }

    console.log(this.state);

    return (
      <div>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <form onSubmit={this.handleSubmit}>{content}</form>
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}

const styleCohort = withStyles(styles)(CohortDetails);
export default connect(mapStateToProps)(styleCohort);
