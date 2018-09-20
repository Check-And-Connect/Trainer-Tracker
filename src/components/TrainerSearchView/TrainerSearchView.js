import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Export from "../Exporter/Exporter";

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
        gridTemplateRows: "0.3fr 9fr",
    },
    rightPanel: {
        display: "Grid",
        gridTemplateRows: "0.0001fr 9fr",
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
    textField: {
        margin: '0em 0em 0.5em 1em',
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
            orderBy: {
                columnName: '',
                ascending: true
            },
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
            if (!this.props.user.isLoading && this.props.user.userName === null) {
              this.props.history.push("home");
            }
          

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
                if (trainer.status) {
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

        if (e.target.value === 'all') {
            this.setState({
                checkAlls: {
                    ...this.state.checkAlls,
                    stateCheckAll: !this.state.checkAlls.stateCheckAll
                }
            })
            if (e.target.checked){
                newSet = new Set(this.state.checkboxesDisplayed.state_name);
            } else if (!e.target.checked){
                newSet = new Set();
            }
        }

        if (newSet.has(e.target.value)) {
            newSet.delete(e.target.value)
        } else {
            newSet.add(e.target.value)
        }

        this.setState({
            checkboxesSelected: {
                ...this.state.checkboxesSelected,
                state_name: newSet
            }
        }, () => this.applyFilters('state'))
    }

    handleSloCheckbox = (e) => {
        let newSet = new Set(this.state.checkboxesSelected.state_level_organization_name);

        if (e.target.value === 'all') {
            this.setState({
                checkAlls: {
                    ...this.state.checkAlls,
                    sloCheckAll: !this.state.checkAlls.sloCheckAll
                }
            })
            if (e.target.checked){
                newSet = new Set(this.state.checkboxesDisplayed.state_level_organization_name);
            } else if (!e.target.checked){
                newSet = new Set();
            }
        }

        if (newSet.has(e.target.value)) {
            newSet.delete(e.target.value)
        } else {
            newSet.add(e.target.value)
        }

        this.setState({
            checkboxesSelected: {
                ...this.state.checkboxesSelected,
                state_level_organization_name: newSet
            }
        }, () => this.applyFilters('slo'));
    }

    handleCohortCheckbox = (e) => {
        let newSet = new Set(this.state.checkboxesSelected.cohort_name);

        if (e.target.value === 'all') {
            this.setState({
                checkAlls: {
                    ...this.state.checkAlls,
                    cohortCheckAll: !this.state.checkAlls.cohortCheckAll
                }
            })
            if (e.target.checked){
                newSet = new Set(this.state.checkboxesDisplayed.cohort_name);
            } else if (!e.target.checked){
                newSet = new Set();
            }
        }

        if (newSet.has(e.target.value)) {
            newSet.delete(e.target.value)
        } else {
            newSet.add(e.target.value)
        }

        this.setState({
            checkboxesSelected: {
                ...this.state.checkboxesSelected,
                cohort_name: newSet
            }
        }, () => this.applyFilters('cohort'))
    }

    handleStatusCheckbox = (e) => {
        let newSet = new Set(this.state.checkboxesSelected.status)

        if (newSet.has(e.target.value)) {
            newSet.delete(e.target.value)
        } else {
            newSet.add(e.target.value)
        }

        this.setState({
            checkboxesSelected: {
                ...this.state.checkboxesSelected,
                status: newSet
            }
        }, () => this.applyFilters('status'))
    }

    applyFilters = (category) => {
        let filteredTrainers = [];
        let displayedSloCheckboxes = this.state.checkboxesDisplayed.state_level_organization_name;
        let displayedCohortCheckboxes = this.state.checkboxesDisplayed.cohort_name;

        if (category === 'state') {
            displayedSloCheckboxes = new Set();
        }
        if (category === 'state' || category === 'slo') {
            displayedCohortCheckboxes = new Set();
        }

        this.props.localTrainerReducer.allLocalTrainers.forEach((trainer) => {
            if (this.state.checkboxesSelected.state_name.has(trainer.state)
                && this.state.checkboxesSelected.state_level_organization_name.has(trainer.state_level_organization.state_level_organization_name)
                && this.state.checkboxesSelected.cohort_name.has(trainer.cohort.cohort_name)
                && ((this.state.checkboxesSelected.status.has('Active') && trainer.status) || (this.state.checkboxesSelected.status.has('Inactive') && !trainer.status))) {
                if (category === 'state') {
                    displayedSloCheckboxes.add(trainer.state_level_organization.state_level_organization_name);
                }
                if (category === 'state' || category === 'slo') {
                    displayedCohortCheckboxes.add(trainer.cohort.cohort_name)
                }
                filteredTrainers.push(trainer)
            }
        })

        this.setState({
            localTrainers: filteredTrainers,
            checkboxesDisplayed: {
                ...this.state.checkboxesDisplayed,
                state_level_organization_name: displayedSloCheckboxes,
                cohort_name: displayedCohortCheckboxes
            }
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
        // console.log(this.state.trainersBeforeSearch);

        let filteredTrainers = this.state.trainersBeforeSearch.filter(
            localTrainer => {
                flag = false;
                let checkStringEquality = object => {
                    Object.keys(object).forEach(key => {
                        if (typeof object[key] === "string" || typeof object[key] === 'number') {

                            if (object[key].toString().toLowerCase().includes(this.state.searchKey.toLowerCase())) {

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
            localTrainers: filteredTrainers
        })
    };

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

        switch (column){
            case 'cohort':
                sortFunction = (a, b) => {
                    let c = a.cohort.cohort_name;
                    let d = b.cohort.cohort_name;
                    return compare(c, d)
                }
                break;
            case 'slo':
                sortFunction = (a, b) => {
                    let c = a.state_level_organization.state_level_organization_name;
                    let d = b.state_level_organization.state_level_organization_name;
                    return compare(c, d)
                }
                break;
            case 'next':
                sortFunction = (a, b) => {
                    let c = a.lastNext[1];
                    let d = b.lastNext[1];
                    return compare(c, d)
                }
                break;
            case 'last':
                sortFunction = (a, b) => {
                    let c = a.lastNext[0];
                    let d = b.lastNext[0];
                    return compare(c, d)
                }
                break;
            case 'due':
                sortFunction = (a, b) => {
                    let c = Number(moment(a.lastNext[2]).format('x'));
                    let d = Number(moment(b.lastNext[2]).format('x'));
                    return compare(c, d)
                }
                break;
            default: 
                sortFunction = (a, b) => {
                    let c = a[column];
                    let d = b[column];
                    return compare(c, d)
                }
                break;
        }

        let sortedTrainers = this.state.localTrainers.sort(sortFunction);

        this.setState({
            orderBy: {
                columnName: column,
                ascending: !this.state.orderBy.ascending
            },
            localTrainers: sortedTrainers
        })
    } 

    getLastNext = (requirementsArray) => {
        if (!requirementsArray) {
            return ['n/a', 'n/a', 'n/a'];
        }

        let lastNext = [null, null, null];
        requirementsArray.sort((a, b) => {
            return a.requirement_id - b.requirement_id
        })
        for (let i = 0; i < requirementsArray.length; i++) {
            if (requirementsArray[i].completed === null) {
                lastNext[1] = requirementsArray[i].requirement_name;
                lastNext[2] = moment(requirementsArray[i].requirement_due_date).format("MM-DD-YYYY");
                if (i === 0) {
                    lastNext[0] = 'n/a';
                    return lastNext
                } else {
                    lastNext[0] = requirementsArray[i - 1].requirement_name;
                    return lastNext;
                }
            }
        }
    }

    handleExport = () => {
        console.log("triggered");
    
        let localTrainers = [
          {
            first_name: "Isaac",
            last_name: "Negatu",
            cohort_name: "Cohort 1"
          },
          {
            first_name: "Yishak",
            last_name: "Turga",
            cohort_name: "Cohort 2"
          }
        ];
        
        return <Export localTrainers={localTrainers} />;
      };


    render() {
        let { classes } = this.props;
        let trainersTableBody = null;

        let sortByIndicator;
        if (this.state.orderBy.ascending){
            sortByIndicator = '▼';
        } else {
            sortByIndicator = '▲';
        }

        let localTrainers = [
            {
              first_name: "Isaac",
              last_name: "Negatu",
              cohort_name: "Cohort 1"
            },
            {
              first_name: "Yishak",
              last_name: "Turga",
              cohort_name: "Cohort 2"
            }
          ];

        if (this.state.localTrainers) {
            trainersTableBody = this.state.localTrainers.map((trainer) => {
                trainer.lastNext = this.getLastNext(trainer.requirements)
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
                        <TableCell className={classes.tableCell} >{trainer.lastNext[0]}</TableCell>
                        <TableCell className={classes.tableCell} >{trainer.lastNext[1]}</TableCell>
                        <TableCell className={classes.tableCell} >{trainer.lastNext[2]}</TableCell>
                    </TableRow>
                )
            })
        }

        return (
            <div>
            <div className={classes.mainComponent}>
                <div className={classes.leftPanel} >
                    <TrainerSearchSidebar
                        checkboxesDisplayed={this.state.checkboxesDisplayed}
                        checkboxesSelected={this.state.checkboxesSelected}
                        checkAlls={this.state.checkAlls}
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
                {/* <Export
                  localTrainers={this.state.localTrainers}
                  button={
                    <Button className={classes.export}>Export Table</Button>
                  }
                /> */}
              </div>
                    </div>
                    <div>
                    <Paper>
                        <Table id="trainer-search-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableCell} onClick={() => this.sortBy('cohort')}>Cohort {this.state.orderBy.columnName === 'cohort' ? sortByIndicator : ' '}</TableCell>
                                    <TableCell className={classes.tableCell} onClick={() => this.sortBy('first_name')}>First Name {this.state.orderBy.columnName === 'first_name' ? sortByIndicator : ' '}</TableCell>
                                    <TableCell className={classes.tableCell} onClick={() => this.sortBy('last_name')}>Last Name {this.state.orderBy.columnName === 'last_name' ? sortByIndicator : ' '}</TableCell>
                                    <TableCell className={classes.tableCell} onClick={() => this.sortBy('state')}>State {this.state.orderBy.columnName === 'state' ? sortByIndicator : ' '}</TableCell>
                                    <TableCell className={classes.tableCell} onClick={() => this.sortBy('slo')}>State-Level Org. {this.state.orderBy.columnName === 'slo' ? sortByIndicator : ' '}</TableCell>
                                    <TableCell className={classes.tableCell} onClick={() => this.sortBy('last')}>Last Complete Req. {this.state.orderBy.columnName === 'last' ? sortByIndicator : ' '}</TableCell>
                                    <TableCell className={classes.tableCell} onClick={() => this.sortBy('next')}>Upcoming Req.{this.state.orderBy.columnName === 'next' ? sortByIndicator : ' '}</TableCell>
                                    <TableCell className={classes.tableCell} onClick={() => this.sortBy('due')}>Due Date {this.state.orderBy.columnName === 'due' ? sortByIndicator : ' '}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {trainersTableBody}
                            </TableBody>
                        </Table>
                    </Paper>
                    </div>
                </div>
            </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => state;


const componentWithStyle = withStyles(styles)(TrainerSearchView);
export default connect(mapStateToProps)(componentWithStyle);