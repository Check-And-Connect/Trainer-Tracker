import React, { Component } from "react";
import ReactExport from "react-data-export";
import { connect } from "react-redux";
import { Button } from '@material-ui/core'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const mapStateToProps = state => ({
  user: state.user,
  localTrainers: state.localTrainerReducer
});
class Export extends Component {
  constructor(props) {
    super(props)
}

  render() {
      console.log('got here');
      console.log('exporter JS', this.props.localTrainers.exportArray);

      // if (this.props.localTrainers.exportArray.length){
      
      return (
        <ExcelFile element={this.props.button}>
          <ExcelSheet data={this.props.localTrainers.exportArray} name='Local Trainers'>
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


export default connect(mapStateToProps)(Export);
