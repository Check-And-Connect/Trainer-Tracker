import React, { Component } from "react";
import ReactExport from "react-data-export";
import moment from 'moment';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class Export extends Component {

  //reformats array to send to excel file

  newHandleExport = (currentTrainers) => {
    let allDataRows = [];
    let requirementNames = new Set();


    for (let trainer of currentTrainers){
      let dataRow = {
        first_name: trainer.first_name,
        last_name: trainer.last_name,
        state: trainer.state,
        state_level_organization: trainer.state_level_organization.state_level_organization_name,
        cohort: trainer.cohort.cohort_name
      }
      for (let req of trainer.requirements){
        requirementNames.add(req.requirement_name + ' ' + req.cycle)
        let reqKey = req.requirement_name.toLowerCase().replace(/\s+/g, '_') + '_' + req.cycle;

        if (req.requirement_id === 3){  // observed training
          requirementNames.add('Observed By')
          dataRow['observed_by'] = (req.national_trainer_first_name || 'N/A') + ' ' + (req.national_trainer_last_name || '');
        }

        if (req.completed){
          dataRow[reqKey] = 'Completed ' + moment(req.completed).format('MM-DD-YYYY');
        } else if (req.scheduled){
          dataRow[reqKey] = 'Scheduled for ' + moment(req.scheduled).format('MM-DD-YYYY');
        } else if (req.requirement_due_date){
          dataRow[reqKey] = 'Due ' + moment(req.requirement_due_date).format('MM-DD-YYYY');
        } else {
          dataRow[reqKey] = 'na'
        }
      }
      allDataRows.push(dataRow)
    }

    let returnObject = {
      allDataRows: allDataRows,
      requirementNames: requirementNames
    }
    return returnObject
  }


  render() {
    let requirementColumnHeads;
    let data;

    if (this.props.localTrainers !== null || undefined) {
      data = this.newHandleExport(this.props.localTrainers);
      requirementColumnHeads = Array.from(data.requirementNames).map(name => {
        return(
          <ExcelColumn label={name} value={name.toLowerCase().replace(/\s+/g, '_')} />
        )
      })
    }

    return (
      <ExcelFile element={this.props.button}>
        <ExcelSheet data={data.allDataRows} name='Local Trainers'>
          <ExcelColumn label="First Name" value="first_name" />
          <ExcelColumn label="Last Name" value="last_name" />
          <ExcelColumn label="State" value="state" />
          <ExcelColumn label="State Level Org" value="state_level_organization" />
          <ExcelColumn label="Cohort" value="cohort" />
          {requirementColumnHeads}
        </ExcelSheet>
      </ExcelFile>
    );
  }
}


export default Export;
