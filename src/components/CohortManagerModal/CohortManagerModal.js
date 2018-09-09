import React, { Component } from "react";
import { connect } from "react-redux";

import MomentUtils from "material-ui-pickers/utils/moment-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import { InlineDatePicker } from "material-ui-pickers/DatePicker";
import moment from "moment";

import { LOCAL_TRAINERS_ACTIONS } from "../../redux/actions/localTrainerActions";
import EditIcon from "@material-ui/icons/Edit";

import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormControlLabel,
  Checkbox,
  withStyles
} from "@material-ui/core";

const mapStateToProps = state => ({
  localTrainers: state.localTrainerReducer,
  nationalTrainers: state.nationalTrainerReducer
});

const styles = {
  mainContent: {
    padding: "4em"
  },
  dropDown: {
    width: "10em"
  },
  textField: {
    width: "20em"
  },
  editIcon: {
    textAlign: "right"
  },
  editable: {
    display: "Grid",
    gridTemplateColumns: "1fr 0.5fr"
  }
};
class CohortManagerModal extends Component {
  state = {
    localTrainer: null,
    nationalTrainer: "",
    completed: null,
    editInfo: false,
    selectedDate: moment().format("ddd, DD MMM YYYY HH:mm:ss ZZ"),
    note : null
  };

  componentDidMount() {
    this.props.dispatch({
      type: LOCAL_TRAINERS_ACTIONS.FETCH_TRAINER_REQUIREMENT_SINGLE,
      payload: this.props.cellInfo
    });

    this.setState({
      localTrainer: this.props.localTrainers.singleTrainerReqInfo[0]
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.localTrainers.singleTrainerReqInfo[0] !==
      this.props.localTrainers.singleTrainerReqInfo[0]
    ) {
      this.setState({
        localTrainer: this.props.localTrainers.singleTrainerReqInfo[0],
        completed: this.props.localTrainers.singleTrainerReqInfo[0]
          .requirements[0].completed,
        selectedDate: this.props.localTrainers.singleTrainerReqInfo[0]
          .requirements[0].completed
          ? this.props.localTrainers.singleTrainerReqInfo[0].requirements[0]
              .completed
          : this.state.selectedDate,
        note : this.props.localTrainers.singleTrainerReqInfo[0].requirements[0].requirement_note  
      });

      let nt = this.props.nationalTrainers.allNationalTrainers.filter(
        nationalTrainer => {
          return (
            nationalTrainer.national_trainer_id ===
            this.props.localTrainers.singleTrainerReqInfo[0].requirements[0]
              .national_trainer_id
          );
        }
      );

      console.log(
        this.props.localTrainers.singleTrainerReqInfo[0].requirements[0]
          .national_trainer_id
      );

      this.setState({
        nationalTrainer: nt.length > 0
          ? nt[0].national_trainer_id
          : ''
      });
    }
  }

  toggleEdit = () => {
    this.setState({
      editInfo: !this.state.editInfo
    });
  };

  handleClose = () => {
    this.props.handleDialgClose();
  };

  handleNationalTrainers = event => {
    console.log(event.target);

    this.setState({
      nationalTrainer: event.target.value
    });
  };

  handleDateChange = date => {
    console.log(date);
    this.setState({
      selectedDate: date.toISOString(),
      completed : date.toISOString()
    });
  };

  handleMarkDone = () => {
    this.setState({
      completed: this.state.selectedDate
    });
  };

  handleNote = event => {
    this.setState({
      note: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    let payload = {
      requirement_id : this.state.localTrainer.requirements[0].requirement_id,
      date_marked_complete : this.state.completed,
      national_trainer : this.state.nationalTrainer,
      note : this.state.note,
      localTrainerIDs : [this.state.localTrainer.local_trainers_id]
    }
    this.props.dispatch({
      type : LOCAL_TRAINERS_ACTIONS.MARK_COMPLETE,
      payload : payload
    })
    
  }

  render() {
    let { classes } = this.props;
    let { localTrainer } = this.state;
    let observerNationalTrainer = "";
    console.log(this.state);

    let nationalTrainers = this.props.nationalTrainers.allNationalTrainers.map(
      nationalTrainer => {
        if (
          localTrainer &&
          nationalTrainer.national_trainer_id ===
            localTrainer.requirements[0].national_trainer_id
        ) {
          observerNationalTrainer =
            nationalTrainer.first_name + " " + nationalTrainer.last_name;
        }

        return (
          <MenuItem
            key={nationalTrainer.national_trainer_id}
            value={nationalTrainer.national_trainer_id}
          >
            {nationalTrainer.first_name} {nationalTrainer.last_name}
          </MenuItem>
        );
      }
    );

    return (
      <Dialog
        className={classes.mainContent}
        open={this.props.dialogOpen}
        onClose={() => {
          this.props.handleDialgClose();
        }}
      >
        <div>
          {localTrainer && (
            <div>
              <DialogTitle>
                {localTrainer.first_name} {localTrainer.last_name}
              </DialogTitle>
              <DialogContent>
                <Typography>
                  Organization :{" "}
                  {
                    localTrainer.state_level_organization
                      .state_level_organization_name
                  }
                </Typography>
                <Typography>
                  Task : {localTrainer.requirements[0].requirement_name}
                </Typography>

                <Typography>
                  Scheduled :{" "}
                  {(moment(
                    localTrainer.requirements[0].scheduled_date
                  ).isValid() &&
                    moment(localTrainer.requirements[0].scheduled_date).format(
                      "MM-DD-YYYY"
                    )) ||
                    "No"}
                </Typography>

                <Typography>
                  Due Date :{" "}
                  {moment(
                    localTrainer.requirements[0].requirement_due_date
                  ).format("MM-DD-YYYY")}
                </Typography>
                <br />
                <hr />

                <form onSubmit={this.handleSubmit}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <div className={classes.editable}>
                      {!this.state.editInfo && (
                        <div>
                          <Typography>
                            Comleted :{" "}
                            {(moment(
                              localTrainer.requirements[0].completed
                            ).isValid() &&
                              moment(
                                localTrainer.requirements[0].completed
                              ).format("MM-DD-YYYY")) ||
                              "No"}
                          </Typography>
                          <Typography>
                            Confirmed By : {observerNationalTrainer}
                          </Typography>
                          {localTrainer.requirements[0].requirement_note &&
                          <Typography>
                            Note : {localTrainer.requirements[0].requirement_note}
                          </Typography>
                          }
                        </div>
                      )}
                      {this.state.editInfo && (
                        <div>
                          <FormControlLabel
                            control={
                              <Checkbox
                                value={
                                  this.state.completed
                                    ? this.state.completed
                                    : ""
                                }
                                checked={this.state.completed ? true : false}
                                onClick={this.handleMarkDone}
                              />
                            }
                            label="Mark Complete"
                          />
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
                          <br />
                          <FormControl>
                            <InputLabel>Confirmed By</InputLabel>
                            <Select
                              className={classes.dropDown}
                              value={this.state.nationalTrainer}
                              onChange={this.handleNationalTrainers}
                              displayEmpty
                            >
                              {nationalTrainers}
                            </Select>
                          </FormControl>
                          <br />
                          <TextField
                            id="multiline-static"
                            label="Leave a Note"
                            multiline
                            rows="4"
                            className={classes.textField}
                            margin="normal"
                            onChange={this.handleNote}
                            value={this.state.note ? this.state.note : ''}
                          />
                          <br />
                          <br />
                          <Button type="submit" color="primary" variant='outlined'>
                            Submit
                          </Button>
                        </div>
                      )}
                      <div className={classes.editIcon}>
                        <EditIcon onClick={this.toggleEdit} />
                      </div>
                    </div>
                  </MuiPickersUtilsProvider>
                </form>
              </DialogContent>
            </div>
          )}
        </div>
      </Dialog>
    );
  }
}

let componentWithStyle = withStyles(styles)(CohortManagerModal);
export default connect(mapStateToProps)(componentWithStyle);
