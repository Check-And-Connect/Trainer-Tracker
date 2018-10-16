import React, { Component } from "react";
import ReactExport from "react-data-export";
import moment from 'moment';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class Export extends Component {

//reformats array to send to excel file
handleExport = (currentTrainers) => {
  let localTrainers = [];
  let newObject = {};

  for (let i = 0; i < currentTrainers.length; i++) {
    let initialTTTWorkshop = '';
    let TTTTermsOfAgreement = '';
    let observedTrainingSession = '';
    let nationalTrainerThatObserved = '';
    let certification = '';
    let CCTraining = '';
    let recertification = '';

    for (let j = 0; j < currentTrainers[i].requirements.length; j++) {
      if (currentTrainers[i].requirements[j].requirement_id === 1){
        initialTTTWorkshop = moment(currentTrainers[i].requirements[j].requirement_due_date).format('MM-DD-YYYY');
      } else if (currentTrainers[i].requirements[j].requirement_id === 2){
        TTTTermsOfAgreement =  moment(currentTrainers[i].requirements[j].requirement_due_date).format('MM-DD-YYYY');
      } else if (currentTrainers[i].requirements[j].requirement_id === 3){
        observedTrainingSession = moment(currentTrainers[i].requirements[j].requirement_due_date).format('MM-DD-YYYY');
        nationalTrainerThatObserved = currentTrainers[i].requirements[j].national_trainer_first_name + ' ' + currentTrainers[i].requirements[j].national_trainer_last_name;
      } else if (currentTrainers[i].requirements[j].requirement_id === 4){
        certification = moment(currentTrainers[i].requirements[j].requirement_due_date).format('MM-DD-YYYY');
      } else if (currentTrainers[i].requirements[j].requirement_id === 5){
        CCTraining = moment(currentTrainers[i].requirements[j].requirement_due_date).format('MM-DD-YYYY');
      } else if (currentTrainers[i].requirements[j].requirement_id === 6){
        recertification = moment(currentTrainers[i].requirements[j].requirement_due_date).format('MM-DD-YYYY');
      } else {
        // console.log('not found')
      }
      }

    newObject = {
      first_name: currentTrainers[i].first_name,
      last_name: currentTrainers[i].last_name,
      state: currentTrainers[i].state,
      state_level_organization: currentTrainers[i].state_level_organization.state_level_organization_name,
      cohort: currentTrainers[i].cohort.cohort_name,
      initial_TTT_Workshop: initialTTTWorkshop,
      TTT_Terms_Of_Agreement: TTTTermsOfAgreement,
      observed_Training_Session: observedTrainingSession,
      national_Trainer_That_Observed: nationalTrainerThatObserved,
      certification_requirement: certification,
      CC_Training: CCTraining,
      re_certification: recertification 
    }
    localTrainers.push(newObject);
  }
  return localTrainers
};


  render() {
    let flattenedArray = [];
    if (this.props.localTrainers !== null || undefined){
      flattenedArray = this.handleExport(this.props.localTrainers);
    }

      return (
        <ExcelFile element={this.props.button}>
          <ExcelSheet data={flattenedArray} name='Local Trainers'>
            <ExcelColumn label="First Name" value="first_name" />
            <ExcelColumn label="Last Name" value="last_name" />
            <ExcelColumn label="State" value="state" />
            <ExcelColumn label="State Level Org" value="state_level_organization" />
            <ExcelColumn label="Cohort" value="cohort" />
            <ExcelColumn label="Initial TTT Workshop" value="initial_TTT_Workshop" />
            <ExcelColumn label="TTT Terms of Agreement" value="TTT_Terms_Of_Agreement" />
            <ExcelColumn label="Observed Training Session" value="observed_Training_Session" />
            <ExcelColumn label="National Trainer that Observed" value="national_Trainer_That_Observed" />
            <ExcelColumn label="Certification" value="certification_requirement" />
            <ExcelColumn label="C &#38; C Training" value="CC_Training" />
            <ExcelColumn label="Recertification" value="re_certification" />
          </ExcelSheet>
        </ExcelFile>
      );
  } 
}


export default Export;
