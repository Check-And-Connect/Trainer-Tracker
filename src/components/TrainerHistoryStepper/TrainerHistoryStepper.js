// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Stepper from '@material-ui/core/Stepper';
// import Step from '@material-ui/core/Step';
// import StepLabel from '@material-ui/core/StepLabel';
// import StepContent from '@material-ui/core/StepContent';
// import Button from '@material-ui/core/Button';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';

// const styles = theme => ({
//   root: {
//     width: '90%',
//   },
//   button: {
//     marginTop: theme.spacing.unit,
//     marginRight: theme.spacing.unit,
//   },
//   actionsContainer: {
//     marginBottom: theme.spacing.unit * 2,
//   },
//   resetContainer: {
//     padding: theme.spacing.unit * 3,
//   },
// });


// class VerticalLinearStepper extends React.Component {
//   state = {
//     activeStep: 0,
//   };

//   handleClick = (e) => {
//     console.log('click');
//     console.log(e.target);
//     this.setState({
//       activeStep: e.target.key
//     })
//   }

//   render() {
//     const { classes } = this.props;
//     const { activeStep } = this.state;

//     let requirementHistory = null;

//     if (this.props.requirements !== null){
//       requirementHistory = this.props.requirements.map((req, index) => {
//         let stepContent = <span><p>Completed: {req.completed}</p><p>Notes: {req.notes}</p></span>
//         return (
//           <Step key={index} onClick={this.handleClick}>
//             <StepLabel>{req.name}{stepContent}</StepLabel>
//             <StepContent>{stepContent}</StepContent>
//           </Step>
//         );
//       })
//     }
//     return (
//       <div className={classes.root}>
//         <Stepper activeStep={4} nonLinear={true} orientation="vertical">
//           {requirementHistory}
//         </Stepper>
//       </div>
//     );
//   }
// }

// export default withStyles(styles)(VerticalLinearStepper);

import React, {Component} from 'react';

import {Timeline, Event} from 'react-timeline-scribble';
import moment from 'moment'


class TrainerHistoryStepper extends Component{
  render(){
    let requirementHistory = null;

    if (this.props.requirements !== null){
      requirementHistory = this.props.requirements.map((req, index) => {
        return(
          <Event interval={req.completed ? 'Completed: ' + moment(req.completed).format("MM-DD-YYYY") : 'Due: ' + moment(req.due_date).format("MM-DD-YYYY")} title={req.name}>

          </Event>
        )
      })
    }

    return(
      <div>
      <Timeline>
        {requirementHistory}
      </Timeline>
      </div>
    )
  }
};

export default TrainerHistoryStepper;