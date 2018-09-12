import React, { Component } from "react";
import ReactExport from "react-data-export";
import { Button } from '@material-ui/core'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class Export extends Component {
  render() {
      console.log('got here');
      console.log(this.props.localTrainers);
      
      
    return (
      <ExcelFile element={this.props.button}>
        <ExcelSheet data={this.props.localTrainers} name='Local Trainers'>
          <ExcelColumn label="First Name" value="first_name" />
          <ExcelColumn label="Last Name" value="last_name" />
          <ExcelColumn label="Cohort" value="cohort_name" />
        </ExcelSheet>
      </ExcelFile>
    );
  }
}

export default Export;
