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
  completed: {
    textDecoration: 'none',
    fontSize: '0.9em',
    background: 'linear-gradient(135deg, white 85%, rgba(124,252,0,0.7));'
  },
  pastDue: {
    textDecoration: 'none',
    fontSize: '1em',
    background: 'linear-gradient(135deg, white 85%, rgba(255, 12, 12, 0.5));'
  },
  scheduled: {
    textDecoration: 'none',
    fontSize: '0.9em',
    background: 'linear-gradient(135deg, white 85%, rgba(255, 250, 0,1));'
  }
};

export class CohortManagerTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      sortBy: '',
      ascending: true
    }
  }

  sortBy = (column) => {
    let sortFunction;

    const compare = (a, b) => {
      if (a && b && a > b) {
        return (this.state.sortBy.ascending ? 1 : -1)
      } else if (a && b && a < b) {
        return (this.state.sortBy.ascending ? -1 : 1)
      } else {
        return 0;
      }
    }

    const compareReqs = (a, b) => {
      if (a.completed && b.completed){
        if (moment(a.completed).format('x') > moment(b.completed).format('x')){
          return 1;
        } else if (moment(a.completed).format('x') < moment(b.completed).format('x')){
          return -1;
        } else {
          return 0;
        }
      } else if (a.completed && !b.completed){
        return 1;
      } else if (!a.completed && b.completed){
        return -1;
      } else if (a.scheduled && b.scheduled){
        if (moment(a.scheduled).format('x') > moment(b.scheduled).format('x'))
      }
    }

    switch (column.slice(0,4)) {
      case 'coho':
        console.log('sort by cohort');
        sortFunction = (a, b) => {
          let c = a.cohort.cohort_name;
          let d = b.cohort.cohort_name;
          return compare(c, d)
        }
        break;
      case 'req_':
        switch (column.slice(-1)) {
          case '1':
            console.log('sort by req 1');
            break;
          case '2':
            console.log('sort by req 2');
            break;
          case '3':
            console.log('sort by req 3');
            break;
          case '4':
            console.log('sort by req 4');
            break;
          case '5':
            console.log('sort by req 5');
            break;
          case '6':
            console.log('sort by req 6');
            break;
        }
        break;  
      default:
        console.log('sort by', column);
        sortFunction = (a, b) => {
          let c = a[column];
          let d = b[column];
          return compare(c, d)
        }
        break;
    }

    let sortedTrainers = this.props.currentTrainers.sort(sortFunction);

    this.setState({
      sortBy: {
        columnName: column,
        ascending: !this.state.sortBy.ascending
      },
      sortedLocalTrainers: sortedTrainers
    })
  }


  formatRequirement = (localTrainerId, reqAry, reqId) => {
    let requirement = reqAry.filter(req => {
      return req.requirement_id === reqId;
    });

    let content;



    if (requirement.length !== 0) {
      let pastDue = moment(requirement[0].requirement_due_date).isBefore(moment());

      if (requirement[0].completed) {
        content = (
          <Button
            onClick={() => this.props.onCellClick(localTrainerId, reqId)}
            className={this.props.classes.completed}
          >
            Completed <br />
            {moment(requirement[0].completed).format("MM-DD-YYYY")}
          </Button>
        );
      } else if (requirement[0].scheduled_date) {

        let style = '';
        if (pastDue) {
          style = this.props.classes.pastDue
        } else {
          style = this.props.classes.scheduled;
        }

        content = (
          <Button
            onClick={() => this.props.onCellClick(localTrainerId, reqId)}
            className={style}
          >
            Scheduled <br />
            {moment(requirement[0].scheduled_date).format("MM-DD-YYYY")}
          </Button>
        );
      } else {

        let style = '';
        if (pastDue) {
          style = this.props.classes.pastDue;
        } else {
          style = this.props.classes.buttonInCell
        }
        content = (
          <Button
            onClick={() => this.props.onCellClick(localTrainerId, reqId)}
            className={style}
          >
            Due <br />
            {moment(requirement[0].requirement_due_date).format("MM-DD-YYYY")}
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
      let tableRow = (
        <TableRow key={localTrainer.local_trainers_id}>
          <TableCell className={this.props.classes.tableCell}>
            <Checkbox
              onChange={() => this.props.handleChecked(localTrainer.local_trainers_id)}
              value={localTrainer.local_trainers_id.toString()}
              checked={this.props.checkedIDs.includes(localTrainer.local_trainers_id)}
            />
          </TableCell>
          <TableCell className={this.props.classes.tableCell}>
            <Link
              to={`/cohort/${localTrainer.cohort.cohort_id}`}
              className={this.props.classes.buttonInCell}

            >
              <Button >{localTrainer.cohort.cohort_name}</Button>
            </Link>
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
              1
            )}
          </TableCell>
          <TableCell className={this.props.classes.tableCell}>
            {this.formatRequirement(
              localTrainer.local_trainers_id,
              localTrainer.requirements,
              2
            )}
          </TableCell>
          <TableCell className={this.props.classes.tableCell}>
            {this.formatRequirement(
              localTrainer.local_trainers_id,
              localTrainer.requirements,
              3
            )}
          </TableCell>
          <TableCell className={this.props.classes.tableCell}>
            {this.formatRequirement(
              localTrainer.local_trainers_id,
              localTrainer.requirements,
              4
            )}
          </TableCell>
          <TableCell className={this.props.classes.tableCell}>
            {this.formatRequirement(
              localTrainer.local_trainers_id,
              localTrainer.requirements,
              5
            )}
          </TableCell>
          <TableCell className={this.props.classes.tableCell}>{this.formatRequirement(
            localTrainer.local_trainers_id,
            localTrainer.requirements,
            6
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
                  />
                </TableCell>
                <TableCell className={this.props.classes.tableCell} onClick={() => this.sortBy('cohort')}>
                  Cohort
                </TableCell>
                <TableCell className={this.props.classes.tableCell} onClick={() => this.sortBy('first_name')}>
                  First Name
                </TableCell>
                <TableCell className={this.props.classes.tableCell} onClick={() => this.sortBy('last_name')}>
                  Last Name
                </TableCell>
                <TableCell className={this.props.classes.tableCell} onClick={() => this.sortBy('req_1')}>
                  Initial Training
                </TableCell>
                <TableCell className={this.props.classes.tableCell} onClick={() => this.sortBy('req_2')}>
                  TTT Terms
                </TableCell>
                <TableCell className={this.props.classes.tableCell} onClick={() => this.sortBy('req_3')}>
                  Observed Training
                </TableCell>
                <TableCell className={this.props.classes.tableCell} onClick={() => this.sortBy('req_4')}>
                  Cert. Workshop
                </TableCell>
                <TableCell className={this.props.classes.tableCell} onClick={() => this.sortBy('req_5')}>
                  C&amp;C Training
                </TableCell>
                <TableCell className={this.props.classes.tableCell} onClick={() => this.sortBy('req_6')}>
                  Recertification
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{tableInfo}</TableBody>
          </Table>
        </Paper>
        {/* {JSON.stringify(this.props.currentTrainers)} */}
      </div>
    );
  }
}

export default withStyles(styles)(CohortManagerTable);
