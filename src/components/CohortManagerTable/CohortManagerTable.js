import React, { Component } from "react";

import { Link } from "react-router-dom";

import { withStyles, Checkbox, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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
  }
};

export class CohortManagerTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      orderBy: {
        columnName: '',
        ascending: true
      }
    }
  }

  sortBy = (column) => {
    let sortFunction;

    const compare = (a, b) => {
      if (a && b && a > b){
          return (this.state.orderBy.ascending ? 1 : -1)
      } else if (a && b && a < b){
          return (this.state.orderBy.ascending ? -1 : 1)
      } else {
          return 0;
      }
    }

    switch(column){
      case 'cohort':
        sortFunction = (a, b) => {
            let c, d;
            try {
                c = a.cohort.cohort_name.trim();
                d = b.cohort.cohort_name.trim();
            } catch(err) {
                console.log('failed to sort', a, b);
            }
            return compare(c, d)
        }
        break;
      
      case 'cycle':
        sortFunction = (a, b) => {
          let c, d;
          try {
            c = a.cohort.cohort_cycle;
            d = b.cohort.cohort_cycle;
          } catch(err){
            console.log('failed to sort', a, b);
          }
        }
    }

    let sortedTrainers = this.state.localTrainers.sort(sortFunction);

    console.log('firing off with ', column);
    this.setState({
      orderBy: {
        ascending: !this.state.orderBy.ascending,
        columnName: column
      }
    })
  }

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

    let sortByIndicator;
    if (this.state.orderBy.ascending){
        sortByIndicator = '▼';
    } else {
        sortByIndicator = '▲';
    }

    
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
                <TableCell className={this.props.classes.tableCell} onClick={() => this.sortBy('cohort')}>
                  Cohort {this.state.orderBy.columnName === 'cohort' ? sortByIndicator : ' '}
                </TableCell>
                <TableCell className={this.props.classes.tableCell} onClick={() => this.sortBy('cycle')}>
                  Cycle {this.state.orderBy.columnName === 'cycle' ? sortByIndicator : ' '}
                </TableCell>
                <TableCell className={this.props.classes.tableCell} onClick={() => this.sortBy('first_name')}>
                  First Name {this.state.orderBy.columnName === 'first_name' ? sortByIndicator : ' '}
                </TableCell>
                <TableCell className={this.props.classes.tableCell} onClick={() => this.sortBy('last_name')}>
                  Last Name {this.state.orderBy.columnName === 'last_name' ? sortByIndicator : ' '}
                </TableCell>
                <TableCell className={this.props.classes.tableCell} onClick={() => this.sortBy('req_1')}>
                  Initial Training {this.state.orderBy.columnName === 'req_1' ? sortByIndicator : ' '}
                </TableCell>
                <TableCell className={this.props.classes.tableCell} onClick={() => this.sortBy('req_2')}>
                  TTT Terms {this.state.orderBy.columnName === 'req_2' ? sortByIndicator : ' '}
                </TableCell>
                <TableCell className={this.props.classes.tableCell} onClick={() => this.sortBy('req_3')}>
                  Observed Training {this.state.orderBy.columnName === 'req_3' ? sortByIndicator : ' '}
                </TableCell>
                <TableCell className={this.props.classes.tableCell} onClick={() => this.sortBy('req_4')}>
                  Cert. Workshop {this.state.orderBy.columnName === 'req_4' ? sortByIndicator : ' '}
                </TableCell>
                <TableCell className={this.props.classes.tableCell} onClick={() => this.sortBy('req_5')}>
                  C&amp;C Training 1 {this.state.orderBy.columnName === 'req_5' ? sortByIndicator : ' '}
                </TableCell>
                <TableCell className={this.props.classes.tableCell} onClick={() => this.sortBy('req_6')}>
                  C&amp;C Training 2 {this.state.orderBy.columnName === 'req_6' ? sortByIndicator : ' '}
                </TableCell>
                <TableCell className={this.props.classes.tableCell} onClick={() => this.sortBy('req_7')}>
                  Recertification {this.state.orderBy.columnName === 'req_7' ? sortByIndicator : ' '}
                </TableCell>
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
