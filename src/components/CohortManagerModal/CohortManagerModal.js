import React, { Component } from "react";
import { connect } from "react-redux";
import { LOCAL_TRAINERS_ACTIONS } from "../../redux/actions/localTrainerActions";

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  FormControlLabel,
  Checkbox,
  withStyles
} from "@material-ui/core";

import moment from "moment";

const mapStateToProps = state => ({
  localTrainers: state.localTrainerReducer
});

const styles = {
  mainContent: {
    padding: "4em"
  },
  dropDown: {
    width: "10em"
  },
  textField: {
    width: "25em"
  }
};
class CohortManagerModal extends Component {
  state = {
    localTrainer: null
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
        localTrainer: this.props.localTrainers.singleTrainerReqInfo[0]
      });
    }
  }

  handleClose = () => {
    this.props.handleDialgClose();
  };

  render() {
    let { localTrainer } = this.state;
    console.log(localTrainer);
    let { classes } = this.props;
    return (
      <Dialog
        className={classes.mainContent}
        open={this.props.dialogOpen}
        onClose={() => {
          this.props.handleDialgClose();
        }}
      >
        {localTrainer && (
          <div>
            <DialogTitle>
              {localTrainer.first_name} {localTrainer.last_name}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
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
                  Scheduled : {localTrainer.requirements[0].schdueled || "No"}
                </Typography>

                <Typography>
                  Due Date :{" "}
                  {moment(
                    localTrainer.requirements[0].requirement_due_date
                  ).format("MM-DD-YYYY")}
                </Typography>
              </DialogContentText>
              <form>
                <FormControl>
                  <InputLabel>Observed By</InputLabel>
                  <Select className={classes.dropDown}>
                    <MenuItem value="someone">national_trainer_2 </MenuItem>
                    <MenuItem value="someone">national_trainer_2 </MenuItem>
                    <MenuItem value="someone">national_trainer_2 </MenuItem>
                  </Select>
                </FormControl>
                <br />
                <FormControlLabel
                  control={<Checkbox value="checkedA" />}
                  label="Mark Done"
                />
                <br />
                <TextField
                  id="multiline-static"
                  label="Leave a Note"
                  multiline
                  rows="4"
                  className={classes.textField}
                  margin="normal"
                />
                <br />
                <br />
                <Button onClick={this.handleClose} color="primary">
                  Submit
                </Button>
              </form>
            </DialogContent>
          </div>
        )}
      </Dialog>
    );
  }
}

let componentWithStyle = withStyles(styles)(CohortManagerModal);
export default connect(mapStateToProps)(componentWithStyle);
