// import React, {Component} from 'react';

// class TrainerSearchSidebar extends Component{
//     render(){
//         return(
//             <div>
//                 <div id="state-checkbox-selector">
//                     <h3>State</h3>
//                     {this.props.state.forEach(((state, index) => (
//                         <div>
//                             <p>{state}</p>
//                             <input 
//                                 key={index}
//                                 type="checkbox" 
//                                 value={state} 
//                                 name="state"
//                                 defaultChecked
//                                 onChange={this.props.handleCheckboxClick}
//                             />
//                         </div>
//                     )))}
//                     <h3>State-Level Org.</h3>
//                     {this.props.state_level_organization_name.forEach(((slo, index) => (
//                         <div>
//                             <p>{slo}</p>
//                             <input 
//                                 key={index}
//                                 type="checkbox" 
//                                 value={slo} 
//                                 name="slo"
//                                 defaultChecked
//                                 onChange={this.props.handleCheckboxClick}
//                             />
//                         </div>
//                     )))}
//                     <h3>Cohort</h3>
//                     {this.props.cohort_name.forEach(((cohort, index) => (
//                         <div>
//                             <p>{cohort}</p>
//                             <input 
//                                 key={index}
//                                 type="checkbox" 
//                                 value={cohort} 
//                                 name="cohort"
//                                 defaultChecked
//                                 onChange={this.props.handleCheckboxClick}
//                             />
//                         </div>
//                     )))}
//                 </div>
//             </div>
//         )
//     }
// };

// export default TrainerSearchSidebar;

import React, { Component } from "react";

import { withStyles } from "@material-ui/core";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = {};

class TrainerSearchSidebar extends Component {
    constructor(props){
        super(props)
    }

  render() {
    let { classes } = this.props;
    let stateCheckboxes = 'placeholder';

    const logStateName = (thing) => {
        console.log(thing);
    }

    console.log('TYPE', typeof this.props.state_name);
    if (this.props.state_name !== undefined){
        const stateArray = Array.from(this.props.state_name);
        stateCheckboxes = stateArray.map((setElement) => {
            console.log(setElement);
            return(
                <div>
                    <p>{setElement}</p>
                    <input
                        type="checkbox"
                        value={setElement}
                        name="state"
                        defaultChecked
                        onChange={this.props.handleCheckboxClick}
                    />
                </div>
            )
        })
        // stateCheckboxes = this.props.state_name.forEach(logStateName)
    }

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
                {this.props.state_level_organization_name}
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
                {this.props.cohort_name}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(TrainerSearchSidebar);
