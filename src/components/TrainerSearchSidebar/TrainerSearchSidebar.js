import React, { Component } from "react";

import { withStyles } from "@material-ui/core";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Checkbox
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { isNullOrUndefined } from "util";

const styles = {  
    mainComponent : {
        marginRight: '0.5em',
        marginLeft: '0.7em'
    },
    expansionDetails : {
        padding : '0em 1.3em 1em 1.3em'
    }
};

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
                    <Checkbox
                        value={setElement}
                        name="state"
                        defaultChecked
                        onChange={this.props.handleStateCheckbox}
                    />
                    <span>{setElement}</span>
                </div>
            )
        })
    }

    if (this.props.state_level_organization_name !== undefined){
        const sloArray = Array.from(this.props.state_level_organization_name);
        stateLevelOrgCheckboxes = sloArray.map((setElement) => {
            return(
                <div>
                    <Checkbox
                        value={setElement}
                        name="state_level_organization_name"
                        defaultChecked
                        onChange={this.props.handleSloCheckbox}
                    />
                    <span>{setElement}</span>
                </div>
            )
        })
    }

    if (this.props.cohort_name !== undefined){
        const cohortArray = Array.from(this.props.cohort_name);
        cohortNameCheckboxes = cohortArray.map((setElement) => {
            return(
                <div>
                    <Checkbox
                        value={setElement}
                        name="cohort_name"
                        defaultChecked
                        onChange={this.props.handleCohortCheckbox}
                    />
                    <span>{setElement}</span>
                </div>
            )
        })
    }

    const statusCheckboxes = 
        <React.Fragment>
        <div>
            <Checkbox
                value="active"
                name="status"
                defaultChecked
            />
            <span>Active</span>
        </div>
        <div>
            <Checkbox
                value="active"
                name="status"
            />
            <span>Inactive</span>
        </div>
        </React.Fragment>

    return (
      <div className={classes.mainComponent} >
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
