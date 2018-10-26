import React, { Component } from "react";

import { withStyles } from "@material-ui/core";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = {
  mainComponent : {
    marginRight: '0.5em',
    marginLeft: '0.7em'
  },
  expansionDetails : {
    padding : '0em 1.3em 1em 1.3em'
  },
  radios : {
    height : '35px'
  }
};

class CohortManagerFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statePicked: "",
      stateOrgPicked: "",
      cohortPicked: ""
    };
  }



  handleChange = property => event => {
    if (property === "statePicked") {
      this.setState({
        [property]: event.target.value,
        stateOrgPicked: "",
        cohortPicked: ""
      }, () => this.props.filterBy(this.state));
    } else if (property === "stateOrgPicked") {
      this.setState({
        [property]: event.target.value,
        cohortPicked: ""
      }, () => this.props.filterBy(this.state));
    } else {
      this.setState({
        [property]: event.target.value
      }, () => this.props.filterBy(this.state));
    }
  };

  render() {
    let { classes } = this.props;
    let states, stateOrgs, cohorts;

    if (this.props.states) {
      let newStates = [];
      for (let state of this.props.states){
        if (state !== undefined){
          newStates.push(state);
        }
      }
      states = newStates.map(state => {
        return (
          <FormControlLabel
            className={classes.radios}
            key={state}
            value={state}
            control={<Radio />}
            label={state}
          />
        );
      });
    }

    if (this.props.cohorts && this.state.stateOrgPicked !== "") {
      let newCohorts = [];
      for (let cohort of this.props.cohorts){
        if (cohort !== undefined){
          newCohorts.push(cohort);
        }
      }
      cohorts = newCohorts.map((cohort, index) => {
        return (
          <FormControlLabel
           className={classes.radios}
            key={index}
            value={cohort}
            control={<Radio />}
            label={cohort}
          />
        );
      });
    }

    if (this.props.stateOrgs && this.state.statePicked !== "") {
      let newStateLevelOrgs = [];
      for (let org of this.props.stateOrgs){
        if (org !== undefined){
          newStateLevelOrgs.push(org);
        }
      }
      stateOrgs = newStateLevelOrgs.map((stateOrg, index) => {
        return (
          <FormControlLabel
            className={classes.radios}
            key={index}
            value={stateOrg}
            control={<Radio />}
            label={stateOrg}
          />
        );
      });
    }

    return (
      <div className={classes.mainComponent}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>State</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.expansionDetails}>
            <RadioGroup
              name="state"
              value={this.state.statePicked}
              onChange={this.handleChange("statePicked")}
            >
              {states}
            </RadioGroup>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              State Level Organizations
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.expansionDetails}>
            <RadioGroup
              name="stateOrg"
              value={this.state.stateOrgPicked}
              onChange={this.handleChange("stateOrgPicked")}
            >
              {stateOrgs}
            </RadioGroup>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Cohort Name</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.expansionDetails}>
            <RadioGroup
              name="cohort"
              value={this.state.cohortPicked}
              onChange={this.handleChange("cohortPicked")}
            >
              {cohorts}
            </RadioGroup>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(CohortManagerFilter);
