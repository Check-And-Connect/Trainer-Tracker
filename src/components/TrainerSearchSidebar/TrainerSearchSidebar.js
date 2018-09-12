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
    let statusCheckboxes = null;

    if (this.props.checkboxesDisplayed.state_name !== null && this.props.checkboxesSelected.state_name){
        const stateArray = Array.from(this.props.checkboxesDisplayed.state_name);
        stateCheckboxes = stateArray.map((setElement) => {
            return(
                <div>
                    <Checkbox
                        value={setElement}
                        name="state"
                        checked={this.props.checkboxesSelected.state_name.has(setElement)}
                        onChange={this.props.handleStateCheckbox}
                    />
                    <span>{setElement}</span>
                </div>
            )
        })
        if (stateCheckboxes.length > 0){
            stateCheckboxes = [<div>
                                <Checkbox
                                    defaultChecked
                                    onChange={this.props.handleStateCheckbox}
                                    value="all"
                                />
                                <span>Select/Unselect All</span>
                                </div>, 
                                ...stateCheckboxes
                            ]
        }
    }

    if (this.props.checkboxesDisplayed.state_level_organization_name !== null){
        const sloArray = Array.from(this.props.checkboxesDisplayed.state_level_organization_name);
        stateLevelOrgCheckboxes = sloArray.map((setElement) => {
            return(
                <div>
                    <Checkbox
                        value={setElement}
                        name="state_level_organization_name"
                        checked={this.props.checkboxesSelected.state_level_organization_name.has(setElement)}
                        onChange={this.props.handleSloCheckbox}
                    />
                    <span>{setElement}</span>
                </div>
            )
        })
        if (stateLevelOrgCheckboxes.length > 0){
            stateLevelOrgCheckboxes = [<div>
                                <Checkbox
                                    defaultChecked
                                    onChange={this.props.handleSloCheckbox}
                                    value="all"
                                />
                                <span>Select/Unselect All</span>
                                </div>, 
                                ...stateLevelOrgCheckboxes
                            ]
        }
    }

    if (this.props.checkboxesDisplayed.cohort_name !== null){
        const cohortArray = Array.from(this.props.checkboxesDisplayed.cohort_name);
        cohortNameCheckboxes = cohortArray.map((setElement) => {
            return(
                <div>
                    <Checkbox
                        value={setElement}
                        name="cohort_name"
                        checked={this.props.checkboxesSelected.cohort_name.has(setElement)}                        
                        onChange={this.props.handleCohortCheckbox}
                    />
                    <span>{setElement}</span>
                </div>
            )
        })
        if (cohortNameCheckboxes.length > 0){
            cohortNameCheckboxes = [<div>
                                <Checkbox
                                    defaultChecked
                                    onChange={this.props.handleCohortCheckbox}
                                    value="all"
                                />
                                <span>Select/Unselect All</span>
                                </div>, 
                                ...cohortNameCheckboxes
                            ]
        }
    }

    if (this.props.checkboxesDisplayed.status !== null){
        const statusArray = Array.from(this.props.checkboxesDisplayed.status)
        statusCheckboxes = statusArray.map((setElement) => {
            return(
                <div>
                    <Checkbox
                        value={setElement}
                        name="status"
                        checked={this.props.checkboxesSelected.status.has(setElement)}
                        onChange={this.props.handleStatusCheckbox}
                    />
                    <span>{setElement}</span>
                </div>
            )
        })
    }


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
