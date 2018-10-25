import React, {Component} from 'react';

import {Timeline, Event} from '../../vendors/build/index';
import moment from 'moment'


class TrainerHistoryStepper extends Component{
  render(){
    let displayedRequirementHistory = [];

    // Only the requirements with a non-null 'completed' property will be shown in the history stepper.
    // ie Only the ones that have been marked complete.
    if (this.props.requirements !== null){
      this.props.requirements.forEach((req, index) => {
        if (req.completed){
          displayedRequirementHistory.unshift(
            <Event interval={req.completed ? 'Completed: ' + moment(req.completed).format("MM-DD-YYYY") : 'Due: ' + moment(req.due_date).format("MM-DD-YYYY")} title={req.name}>
              <p>Observed/Marked Complete By: {req.first_name + ' ' + req.last_name}</p>
              <p>{req.req_notes ? 'Notes: ' + req.req_notes : null}</p>
            </Event>
          )
        }
      })
    }

    return(
      <div>
      <Timeline>
        {displayedRequirementHistory}
      </Timeline>
      </div>
    )
  }
};

export default TrainerHistoryStepper;