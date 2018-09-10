import React, { Component } from "react";
import { connect } from "react-redux";
import {
  withStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Button
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { NATIONAL_TRAINER_ACTIONS } from "../../redux/actions/nationalTrainerActions";

const mapStateToProps = state => ({
  nationalTrainers: state.nationalTrainerReducer
});

const styles = {
  mainList: {
    display: "Grid",
    gridTemplateColumns: "0.5fr 1fr 0.5fr",
    alignItems: "center"
  },
  innerExpansion: {
    display: "Grid",
    gridTemplateRows: "1fr 1fr 1fr",
    textAlign: "left"
  }
};

export class NationalTrainerList extends Component {
  handleStatus = id => {
    this.props.dispatch({
      type: NATIONAL_TRAINER_ACTIONS.CHANGE_STATUS,
      id: id
    });
  };
  render() {
    let { classes } = this.props;

    let nationalTrainers = this.props.nationalTrainers.allNationalTrainers.map(
      (nationalTrainer , index) => {
        return (
          <ExpansionPanel key={index}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                {nationalTrainer.first_name} {nationalTrainer.last_name}
              </Typography>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails className={classes.innerExpansion}>
              <Typography>Email : {nationalTrainer.email}</Typography>
              <br />
              <Typography>Title : {nationalTrainer.title}</Typography>
              <br />

              {nationalTrainer.status && (
                <Button
                  variant="outlined"
                  onClick={() => this.handleStatus(
                    nationalTrainer.national_trainer_id
                  )}
                >
                  Deactivate
                </Button>
              )}
              {!nationalTrainer.status && (
                <Button
                  variant="outlined"
                  onClick={() => this.handleStatus(
                    nationalTrainer.national_trainer_id
                  )}
                >
                  Activate
                </Button>
              )}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      }
    );
    return (
      <div>
        LIST OF TRAINERS
        <br />
        <br />
        <div className={classes.mainList}>
          <div />
          <div> {nationalTrainers}</div>

          <div />
        </div>
      </div>
    );
  }
}

const componentwithStyle = withStyles(styles)(NationalTrainerList);
export default connect(mapStateToProps)(componentwithStyle);
