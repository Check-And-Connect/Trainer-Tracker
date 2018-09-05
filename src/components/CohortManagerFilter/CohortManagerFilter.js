
import React, { Component } from 'react'

import { withStyles } from "@material-ui/core";
import {ExpansionPanel , ExpansionPanelSummary  , ExpansionPanelDetails  , Typography  ,  ExpandMoreIcon} from '@material-ui/core';


const styles = {

}

class CohortManagerFilter extends Component {
  render() {
    return (
      <div>
        <ExpansionPanel>
          
        </ExpansionPanel>
        <Typography>COHORT MANAGER FILTER</Typography>
      </div>
    )
  }
}

export default withStyles(styles)(CohortManagerFilter)
