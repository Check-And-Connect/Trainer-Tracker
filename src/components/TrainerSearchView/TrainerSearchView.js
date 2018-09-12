import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { LOCAL_TRAINERS_ACTIONS } from '../../redux/actions/localTrainerActions';
import { COHORT_ACTIONS } from '../../redux/actions/cohortActions';

import TrainerSearchSidebar from '../TrainerSearchSidebar/TrainerSearchSidebar';
import TrainerTableSearch from '../TrainerTableSearch/TrainerTableSearch';

import { withStyles, Button, Paper, TextField } from "@material-ui/core";
import { Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core';

const styles = {
    mainComponent: {
      display: "Grid",
      gridTemplateColumns: "1fr 4fr"
    },
    leftPanel: {
      display: "Grid",
      gridTemplateRows: "0.3fr 8fr",
    },
    rightPanel: {
      display : "Grid",
      gridTemplateRows: "0.3fr 8fr",
      margin: "0em 1em"
    },
    tableCell: {
        padding: 0,
        textAlign: "center",
        fontSize: "0.8em"
      },
      buttonInCell: {
        fontSize: "0.8em",
        textDecoration: 'none',
      },
      textField : {
        margin : '0em 0em 0.5em 1em',
      },
      searchAndExport: {
        display: "Grid",
        gridTemplateColumns: "7fr 1fr"
      },
      export: {
        marginTop: "1em",
        textAlign: "center"
      }

  };

class TrainerSearchView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            localTrainers: [],
            trainersBeforeSearch: [],
            searchKey: '',
            // Using sets instead of arrays for the checkboxesSelected, since they are limited to 
            // unique values by default.
            checkboxesSelected: {
                state_name: new Set(),
                state_level_organization_name: new Set(),
                cohort_name: new Set(),
                status: new Set(['Active'])
            },
            checkboxesDisplayed: {
                state_name: null,
                state_level_organization_name: null,
                cohort_name: null,
                status: null
            },
            checkAlls: {
                stateCheckAll: true,
                sloCheckAll: true,
                cohortCheckAll: true
            }
        }
    }

    // Fetch all the info when the page loads the first time, then we use client-side JS for the filtering actions
    componentDidMount = () => {
        this.props.dispatch({
            type: LOCAL_TRAINERS_ACTIONS.FETCH_LOCAL_TRAINERS
        })
    }

    // This fires after the dispatched action has set the local trainer reducer
    componentDidUpdate = (prevProps) => {
        if (prevProps.localTrainerReducer.allLocalTrainers !== this.props.localTrainerReducer.allLocalTrainers) {

            let newDisplayedCheckboxes = {
                state_name: new Set(),
                state_level_organization_name: new Set(),
                cohort_name: new Set(),
                status: new Set(['Active', 'Inactive'])
            }

            // As we map over the trainers, we add the state, slo, and cohort information to the displayed checkboxes
            // piece of local state. This ensures that we only ever show checkbox filters for the trainers in the table.
            let displayedTrainersList = [];
            this.props.localTrainerReducer.allLocalTrainers.forEach((trainer) => {
                if (trainer.status){
                    newDisplayedCheckboxes.state_name.add(trainer.state)
                    newDisplayedCheckboxes.state_level_organization_name.add(trainer.state_level_organization.state_level_organization_name)
                    newDisplayedCheckboxes.cohort_name.add(trainer.cohort.cohort_name)
                    displayedTrainersList.push(trainer);
                }
            })

            // The initial configuration is storing a copy of the allLocalTrainers array from the reducer in local state,
            // another copy in the local state for updating when we filter by typed input, the checkboxes displayed
            // are everything available in the dataset, and the checkboxes selected is a copy of that i.e. everything.
            this.setState({
                localTrainers: displayedTrainersList,
                trainersBeforeSearch: this.props.localTrainerReducer.allLocalTrainers,
                checkboxesDisplayed: newDisplayedCheckboxes,
                checkboxesSelected: {
                    ...newDisplayedCheckboxes,
                    status: new Set(['Active'])
                }
            })
        }
    }

    // This is a placeholder for when we actually get the export function hooked up.
    handleExport = () => {
        console.log('export function called');
    }

    //
    handleSearchInputChange = (e) => {
        this.setState({
            searchInput: e.target.value
        })
    }

    handleStateCheckbox = (e) => {
        console.log('handling state checkbox');
        console.log(e.target.checked);
        let newSet = new Set(this.state.checkboxesSelected.state_name);

        if (e.target.value === 'all' && e.target.checked){
            newSet = new Set(this.state.checkboxesDisplayed.state_name)
        } else if (e.target.value === 'all' && !e.target.checked){
            newSet = new Set();
        }

        let sloSet = new Set();
        let cohortSet= new Set();
        if (newSet.has(e.target.value)){
            newSet.delete(e.target.value)
        } else {
            newSet.add(e.target.value)
        }

        this.setState({
            checkboxesSelected: {
                ...this.state.checkboxesSelected,
                state_name: newSet
            },
            checkAlls: {
                ...this.state.checkAlls,
                stateCheckAll: !this.state.checkAlls.stateCheckAll
            }
        })

        let filteredTrainersList = [];
        this.props.localTrainerReducer.allLocalTrainers.forEach((trainer) => {
            if (newSet.has(trainer.state)){
                sloSet.add(trainer.state_level_organization.state_level_organization_name);
                cohortSet.add(trainer.cohort.cohort_name);
                filteredTrainersList.push(trainer)
            }
        })

        console.log(sloSet);

        this.setState({
            localTrainers: filteredTrainersList,
            checkboxesDisplayed: {
                ...this.state.checkboxesDisplayed,
                state_level_organization_name: sloSet,
                cohort_name: cohortSet
            }
        })
    }

    handleSloCheckbox = (e) => {
        console.log('handling slo checkbox');
        let newSet = new Set(this.state.checkboxesSelected.state_level_organization_name);

        if (e.target.value === 'all' && e.target.checked){
            newSet = new Set(this.state.checkboxesDisplayed.state_level_organization_name)
        } else if (e.target.value === 'all' && !e.target.checked){
            newSet = new Set();
        }

        let cohortSet= new Set();
        if (newSet.has(e.target.value)){
            newSet.delete(e.target.value)
        } else {
            newSet.add(e.target.value)
        }

        this.setState({
            checkboxesSelected: {
                ...this.state.checkboxesSelected,
                state_level_organization_name: newSet
            }
        })

        let filteredTrainersList = [];
        this.props.localTrainerReducer.allLocalTrainers.forEach((trainer) => {
            if (newSet.has(trainer.state_level_organization.state_level_organization_name)){
                cohortSet.add(trainer.cohort.cohort_name);
                filteredTrainersList.push(trainer)
            }
        })

        this.setState({
            localTrainers: filteredTrainersList,
            checkboxesDisplayed: {
                ...this.state.checkboxesDisplayed,
                cohort_name: cohortSet
            }
        })
    }

    handleCohortCheckbox = (e) => {
        console.log('handling cohort checkbox');
        let newSet = new Set(this.state.checkboxesSelected.cohort_name);

        if (e.target.value === 'all' && e.target.checked){
            newSet = new Set(this.state.checkboxesDisplayed.cohort_name)
        } else if (e.target.value === 'all' && !e.target.checked){
            newSet = new Set();
        }

        if (newSet.has(e.target.value)){
            newSet.delete(e.target.value)
        } else {
            newSet.add(e.target.value)
        }

        this.setState({
            checkboxesSelected: {
                ...this.state.checkboxesSelected,
                cohort_name: newSet
            }
        })

        let filteredTrainersList = [];
        this.props.localTrainerReducer.allLocalTrainers.forEach((trainer) => {
            if (newSet.has(trainer.cohort.cohort_name)){
                filteredTrainersList.push(trainer)
            }
        })

        this.setState({
            localTrainers: filteredTrainersList
        })
    }

    handleStatusCheckbox = (e) => {
        console.log('handling status checkbox');
        let newSet = new Set(this.state.checkboxesSelected.status)

        if (newSet.has(e.target.value)){
            newSet.delete(e.target.value)
        } else {
            newSet.add(e.target.value)
        }

        let filteredTrainersList = [];
        this.props.localTrainerReducer.allLocalTrainers.forEach((trainer) => {
            if ((trainer.status && newSet.has('Active')) || (!trainer.status && newSet.has('Inactive'))){
                filteredTrainersList.push(trainer)
            }
        })

        this.setState({
            checkboxesSelected: {
                ...this.state.checkboxesSelected,
                status: newSet
            },
            localTrainers: filteredTrainersList
        })
    }

    handleSearchTable = searchKey => {
        if (this.state.searchKey === "") {
          this.setState({
            trainersBeforeSearch: this.state.localTrainers
          });
        }
    
        this.setState(
          {
            searchKey: searchKey
          },
          () => {
            this.handleSearchTableWithKey();
          }
        );
      };

    handleSearchTableWithKey = () => {
        let flag = false;
        console.log(this.state.trainersBeforeSearch);
    
        let filteredTrainers = this.state.trainersBeforeSearch.filter(
          localTrainer => {
            flag = false;
            let checkStringEquality = object => {
              Object.keys(object).forEach(key => {
                if (typeof object[key] === "string" || typeof object[key] === 'number') {

                  if (object[key].toString().toLowerCase().includes(this.state.searchKey.toLowerCase())) {
                    // console.log(object[key].toString().toLowerCase() + ' includes ' + this.state.searchKey);
                    
                    flag = true;
                    
                  }
                } else if (Array.isArray(object[key])) {
    
                  object[key].forEach(objectInKey => {
                    checkStringEquality(objectInKey);
                  });
                } else if (typeof object[key] === "object" && object[key] !== null) {
    
                  checkStringEquality(object[key]);
                }
              });
            };
    
            checkStringEquality(localTrainer);
            
            return flag;
          }
        );
    
        this.setState({
          localTrainers : filteredTrainers
        })
      };

    getLastNext = (requirementsArray) => {
        let lastNext = [null, null, null];
        requirementsArray.sort((a, b) => {
            return a.requirement_id - b.requirement_id
        })
        for (let i=0; i<requirementsArray.length; i++){
            if (requirementsArray[i].completed === null){
                lastNext[1] = requirementsArray[i].requirement_name;
                lastNext[2] = moment(requirementsArray[i].requirement_due_date).format("MM-DD-YYYY");
                if (i === 0){
                    lastNext[0] = 'n/a';
                    return lastNext
                } else {
                    lastNext[0] = requirementsArray[i-1].requirement_name;
                    return lastNext;
                }
            }
        }
    }


    render() {
        let { classes } = this.props;
        let trainersTableBody = null;

        if (this.state.localTrainers) {
            trainersTableBody = this.state.localTrainers.map((trainer) => {
                let lastNext = this.getLastNext(trainer.requirements)
                return (
                    <TableRow key={trainer.local_trainers_id}>
                        <TableCell className={classes.tableCell}>
                            <Link 
                                to={"/cohort" + trainer.cohort.cohort_id}
                                className={classes.buttonInCell}
                            >
                                <Button>{trainer.cohort.cohort_name}</Button>
                            </Link>
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                            <Link 
                                to={"/trainerdetails/" + trainer.local_trainers_id}
                                className={classes.buttonInCell}
                            >
                                <Button>{trainer.first_name}</Button>
                            </Link>
                        </TableCell>
                        <TableCell className={classes.tableCell} >
                            <Link 
                                to={"/trainerdetails/" + trainer.local_trainers_id}
                                className={classes.buttonInCell}
                            >
                                <Button>{trainer.last_name}</Button>
                            </Link>
                        </TableCell>
                        <TableCell className={classes.tableCell} >{trainer.state}</TableCell>
                        <TableCell className={classes.tableCell} >{trainer.state_level_organization.state_level_organization_name}</TableCell>
                        <TableCell className={classes.tableCell} >{lastNext[0]}</TableCell>
                        <TableCell className={classes.tableCell} >{lastNext[1]}</TableCell>
                        <TableCell className={classes.tableCell} >{lastNext[2]}</TableCell>
                    </TableRow>
                )
            })
        }

        return (
            <React.Fragment>
            <div className={classes.mainComponent}>
                 <div className={classes.leftPanel} >
                    <TrainerSearchSidebar 
                        checkboxesDisplayed={this.state.checkboxesDisplayed}
                        checkboxesSelected={this.state.checkboxesSelected}
                        handleStateCheckbox={this.handleStateCheckbox}
                        handleSloCheckbox={this.handleSloCheckbox}
                        handleCohortCheckbox={this.handleCohortCheckbox}
                        handleStatusCheckbox={this.handleStatusCheckbox}
                    />                 
                </div>
                <div className={classes.rightPanel}>
                    <div className={classes.searchAndExport}>
                        <TrainerTableSearch 
                            search={this.handleSearchTable}
                            searchKey={this.state.searchKey} 
                        />
                            <div>
                                <Button className={classes.export}>Export</Button>
                            </div>
                    </div>
                <Paper>
                <Table id="trainer-search-table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableCell} >Cohort</TableCell>
                            <TableCell className={classes.tableCell} >First Name</TableCell>
                            <TableCell className={classes.tableCell} >Last Name</TableCell>
                            <TableCell className={classes.tableCell} >State</TableCell>
                            <TableCell className={classes.tableCell} >State-Level Org.</TableCell>
                            <TableCell className={classes.tableCell} >Last Completed Req.</TableCell>
                            <TableCell className={classes.tableCell} >Upcoming Req.</TableCell>
                            <TableCell className={classes.tableCell} >Due Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {trainersTableBody}
                    </TableBody>
                </Table>
                </Paper>
                </div>
            </div>
            </React.Fragment>
        )
    }
};

const mapStateToProps = (state) => state;


const componentWithStyle = withStyles(styles)(TrainerSearchView);
export default connect(mapStateToProps)(componentWithStyle);