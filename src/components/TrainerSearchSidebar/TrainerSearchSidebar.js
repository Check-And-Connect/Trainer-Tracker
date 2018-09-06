import React, { Component } from "react";

import { withStyles } from "@material-ui/core";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { isNullOrUndefined } from "util";

const styles = {};

class TrainerSearchSidebar extends Component {
    constructor(props){
        super(props)
    }

  render() {
    let { classes } = this.props;
    let stateCheckboxes = null;
    let stateLevelOrgCheckboxes = null;
    let cohortNameCheckboxes = null;

    if (this.props.state_name !== undefined){
        const stateArray = Array.from(this.props.state_name);
        stateCheckboxes = stateArray.map((setElement) => {
            return(
                <div>
                    <p>{setElement}</p>
                    <input
                        type="checkbox"
                        value={setElement}
                        name="state"
                        defaultChecked
                        onChange={this.props.handleStateCheckbox}
                    />
                </div>
            )
        })
    }

    if (this.props.state_level_organization_name !== undefined){
        const sloArray = Array.from(this.props.state_level_organization_name);
        stateLevelOrgCheckboxes = sloArray.map((setElement) => {
            return(
                <div>
                    <p>{setElement}</p>
                    <input
                        type="checkbox"
                        value={setElement}
                        name="state_level_organization_name"
                        defaultChecked
                        onChange={this.props.handleSloCheckbox}
                    />
                </div>
            )
        })
    }

    if (this.props.cohort_name !== undefined){
        const cohortArray = Array.from(this.props.cohort_name);
        cohortNameCheckboxes = cohortArray.map((setElement) => {
            return(
                <div>
                    <p>{setElement}</p>
                    <input
                        type="checkbox"
                        value={setElement}
                        name="cohort_name"
                        defaultChecked
                        onChange={this.props.handleCheckboxClick}
                    />
                </div>
            )
        })
    }

    const statusCheckboxes = 
        <React.Fragment>
        <div>
            <p>Active</p>
            <input
                type="checkbox"
                value="active"
                name="status"
                defaultChecked
            />
        </div>
        <div>
            <p>Inactive</p>
            <input
                type="checkbox"
                value="active"
                name="status"
            />
        </div>
        </React.Fragment>

    return (
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              State
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
              <Typography>
                {stateCheckboxes}
              </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              State Level Organization
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
                {stateLevelOrgCheckboxes}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Cohort Name
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
                {cohortNameCheckboxes}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Status
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
                {statusCheckboxes}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(TrainerSearchSidebar);
