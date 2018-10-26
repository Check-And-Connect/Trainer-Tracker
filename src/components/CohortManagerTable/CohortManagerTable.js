import React, { Component } from "react";

import { Link } from "react-router-dom";

import { withStyles, Checkbox, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Tooltip from '@material-ui/core/Tooltip';

import moment from "moment";

const styles = {
 
  tableCell: {
    padding: 0,
    textAlign: "center",
    
  },
  buttonInCell: {
    fontSize: "0.9em",
    textDecoration: 'none',
  },
  completed : {
    textDecoration: 'none',
    fontSize : '0.9em',
    background : 'linear-gradient(135deg, white 85%, rgba(124,252,0,0.7));'
  },
  pastDue : {
    textDecoration: 'none',
    fontSize : '1em',
    background : 'linear-gradient(135deg, white 85%, rgba(255, 12, 12, 0.5));'
  },
  scheduled : {
    textDecoration: 'none',
    fontSize : '0.9em',
    background : 'linear-gradient(135deg, white 85%, rgba(255, 250, 0,1));'
  },
  tooltip : {
    fontSize : '4em'
  }
};

export class CohortManagerTable extends Component {
  

  formatRequirement = (localTrainerId, reqAry, cycle, reqId) => {
    let requirement = reqAry.filter(req => {
      return (req.requirement_id === reqId && req.cycle === cycle);
    });

    if(requirement.length === 0 && !this.props.oneCohortID) {
      requirement = reqAry.filter(req => {
        return (req.requirement_id === reqId);
      });
    }
    

    let content;

    if (requirement.length !== 0) {
      let pastDue = moment(requirement[requirement.length - 1].requirement_due_date).isBefore(moment());

      if (requirement[requirement.length - 1].completed) {
        content = (
          <Button
            onClick={() => this.props.onCellClick(localTrainerId, reqId, requirement[requirement.length-1].cycle, requirement[requirement.length-1].lc_req_id)}
            className={this.props.classes.completed}
          >
            Completed <br />
            {moment(requirement[requirement.length - 1].completed).format("MM-DD-YYYY")}
          </Button>
        );
      } else if (requirement[requirement.length - 1].scheduled_date) {
        
        let style = '';
        if(pastDue){
          style = this.props.classes.pastDue
        }else{
          style = this.props.classes.scheduled;
        }
        
        content = (
          <Button
            onClick={() => this.props.onCellClick(localTrainerId, reqId, requirement[requirement.length-1].cycle , requirement[requirement.length-1].lc_req_id)}
            className={style}
          >
            Scheduled <br />
            {moment(requirement[requirement.length - 1].scheduled_date).format("MM-DD-YYYY")}
          </Button>
        );
      } else {
      
        let style = '';
        if(pastDue) {
          style = this.props.classes.pastDue;
        }else{
          style = this.props.classes.buttonInCell
        }
        content = (
          <Button
            onClick={() => this.props.onCellClick(localTrainerId, reqId, requirement[requirement.length-1].cycle , requirement[requirement.length-1].lc_req_id)}
            className={style}
          >
            Due <br />
            {moment(requirement[requirement.length - 1].requirement_due_date).format("MM-DD-YYYY")}
          </Button>
        );
      }
    } else {
      content = "n/a";
    }

    return content;
  };

  render() {

    
    let tableInfo = this.props.currentTrainers.map(localTrainer => {
      let cycle = this.props.oneCohortID ? this.props.cyclePickerInfo.cycleDisplayed : localTrainer.cycle;

      let tableRow = (
        <TableRow key={localTrainer.local_trainers_id}>
          <TableCell className={this.props.classes.tableCell}>
            <Checkbox
              onChange={() => this.props.handleChecked(localTrainer.local_trainers_id)}
              value={localTrainer.local_trainers_id.toString()}
              checked={this.props.checkedIDs.includes(localTrainer.local_trainers_id)}
              disabled={this.props.oneCohortID === null}
            />
          </TableCell>
          <TableCell className={this.props.classes.tableCell}>
            <Link
              to={`/cohort/${localTrainer.cohort.cohort_id}`}
              className={this.props.classes.buttonInCell}
             
            >
              <Button>{localTrainer.cohort.cohort_name}</Button>
            </Link>
          </TableCell>
          <TableCell className={this.props.classes.tableCell}>
            {cycle}
          </TableCell>
          <TableCell className={this.props.classes.tableCell}>
            <Link
              to={`/trainerdetails/${localTrainer.local_trainers_id}`}
              className={this.props.classes.buttonInCell}
            >
              <Button>{localTrainer.first_name}</Button>
            </Link>
          </TableCell>
          <TableCell className={this.props.classes.tableCell}>
          <Link
              to={`/trainerdetails/${localTrainer.local_trainers_id}`}
              className={this.props.classes.buttonInCell}
            >
              <Button>{localTrainer.last_name}</Button>
            </Link>
          </TableCell>
          <TableCell className={this.props.classes.tableCell}>
            {this.formatRequirement(
              localTrainer.local_trainers_id,
              localTrainer.requirements,
              cycle,
              1
            )}
          </TableCell>
          <TableCell className={this.props.classes.tableCell}>
            {this.formatRequirement(
              localTrainer.local_trainers_id,
              localTrainer.requirements,
              cycle,
              2
            )}
          </TableCell>
          <TableCell className={this.props.classes.tableCell}>
            {this.formatRequirement(
              localTrainer.local_trainers_id,
              localTrainer.requirements,
              cycle,
              3
            )}
          </TableCell>
          <TableCell className={this.props.classes.tableCell}>
            {this.formatRequirement(
              localTrainer.local_trainers_id,
              localTrainer.requirements,
              cycle,
              4
            )}
          </TableCell>
          <TableCell className={this.props.classes.tableCell}>
            {this.formatRequirement(
              localTrainer.local_trainers_id,
              localTrainer.requirements,
              cycle,
              5
            )}
          </TableCell>
          <TableCell className={this.props.classes.tableCell}>{this.formatRequirement(
              localTrainer.local_trainers_id,
              localTrainer.requirements,
              cycle,
              6
            )}</TableCell>
            <TableCell className={this.props.classes.tableCell}>{this.formatRequirement(
              localTrainer.local_trainers_id,
              localTrainer.requirements,
              cycle,
              7
            )}</TableCell>
        </TableRow>
      );

      return tableRow;
    });

    let tableHeadInfo = this.props.cohortInfo.requirements.map(req => {
      return  <Tooltip title={req.name} placement="top" className={this.props.classes.tooltip} >
                <TableCell className={this.props.classes.tableCell}>
              
                  {`${req.name.slice(0,15)}...`}
              
                </TableCell>
              </Tooltip>
    })

    return (
      <div className={this.props.classes.mainComponent}>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={this.props.classes.tableCell}>
                  <Checkbox
                    checked={this.props.currentTrainers.length === this.props.checkedIDs.length}
                    onChange={() => this.props.handleChecked('selectAll')}
                    value="all"
                    disabled={this.props.oneCohortID === null}
                  />
                </TableCell>
                <TableCell className={this.props.classes.tableCell}>
                  Cohort
                </TableCell>
                <TableCell className={this.props.classes.tableCell}>
                  Cycle
                </TableCell>
                <TableCell className={this.props.classes.tableCell}>
                  First Name
                </TableCell>
                <TableCell className={this.props.classes.tableCell}>
                  Last Name
                </TableCell>
                {tableHeadInfo}
              </TableRow>
            </TableHead>
            <TableBody>{tableInfo}</TableBody>
          </Table>
        </Paper>
       
      </div>
    );
  }
}

export default withStyles(styles)(CohortManagerTable);
