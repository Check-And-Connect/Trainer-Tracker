import React, { Component } from "react";
import { withStyles, Checkbox } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = {};

export class CohortManagerTable extends Component {

    handleChange = () => {
        console.log('checkbox clicked');
        
    }

  render() {

    // let tableInfo = this.props.currentTrainers;

    return (
      <div>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    // checked={this.state.checkedA}
                    onChange={this.handleChange("checkedA")}
                    value="checkedA"
                  />
                </TableCell>
                <TableCell>Cohort</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Initial Training</TableCell>
                <TableCell>TTT Terms</TableCell>
                <TableCell>Observed Training</TableCell>
                <TableCell>Cert. Workshop</TableCell>
                <TableCell>C&amp;C Training</TableCell>
                <TableCell>Recertification</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

            </TableBody>
          </Table>
        </Paper>
        {/* {JSON.stringify(this.props.localTrainers)} */}
      </div>
    );
  }
}

export default withStyles(styles)(CohortManagerTable);
