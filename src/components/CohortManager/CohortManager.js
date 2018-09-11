import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles, Button, Typography } from "@material-ui/core";

import { USER_ACTIONS } from "../../redux/actions/userActions";
import { LOCAL_TRAINERS_ACTIONS } from "../../redux/actions/localTrainerActions";
import { COHORT_ACTIONS } from "../../redux/actions/cohortActions";
import { NATIONAL_TRAINER_ACTIONS } from "../../redux/actions/nationalTrainerActions";
import CohortManagerFilter from "../CohortManagerFilter/CohortManagerFilter";
import Scheduler from "../Scheduler/Scheduler";
import CohortManagerTable from "../CohortManagerTable/CohortManagerTable";
import CohortManagerTableSearch from "../CohortManagerTableSearch/CohortManagerTableSearch";
import CohortManagerModal from "../CohortManagerModal/CohortManagerModal";

const mapStateToProps = state => ({
  user: state.user,
  localTrainers: state.localTrainerReducer
});

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
    gridTemplateRows: "0.3fr 9fr",
    margin: "0em 1em"
  },
  searchAndExport: {
    display: "Grid",
    gridTemplateColumns: "7fr 1fr"
  },
  export: {
    marginTop: "1em",
    textAlign: "center"
  },
  note : {
    margin : '1em'
  }
};
class CohortManager extends Component {
  state = {
    currentTrainers: [],
    trainersBeforeSearch: [],
    cellInfo: {
      localTrainerId: 0,
      requirementId: 0
    },
    filters: {
      statePicked: "",
      stateOrgPicked: "",
      cohortPicked: ""
    },
    dialogOpen: false,
    checkedIDs: [],
    searchKey: ""
  };

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({ type: LOCAL_TRAINERS_ACTIONS.FETCH_LOCAL_TRAINERS });
    this.props.dispatch({
      type: NATIONAL_TRAINER_ACTIONS.FETCH_ALL_NATIONAL_TRAINERS
    });
    this.props.dispatch({ type: COHORT_ACTIONS.FETCH_REQUIREMENTS });
    this.setState({
      currentTrainers: this.props.localTrainers.allLocalTrainers
    });
  }

  componentDidUpdate(prevProps) {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push("home");
    }

    if (
      prevProps.localTrainers.allLocalTrainers.length === 0 &&
      this.props.localTrainers.allLocalTrainers.length !== 0
    ) {

      if(this.state.currentTrainers.length !== 0){
        let filteredTrainers = this.props.localTrainers.allLocalTrainers.filter(localTrainer => {
          let lcFoundInCurrent = this.state.currentTrainers.find(lc => {
           return  lc.local_trainers_id === localTrainer.local_trainers_id
          })

          if(lcFoundInCurrent){
            return true;
          }else {
            return false;
          }
        })

        this.setState({
          currentTrainers : filteredTrainers
        })
      }else {
        this.setState({
          currentTrainers: this.props.localTrainers.allLocalTrainers
        });
      }

      
    }
  }

  handleCellClick = (localTrainerId, requirementId) => {
    this.setState({
      cellInfo: {
        localTrainerId: localTrainerId,
        requirementId: requirementId
      },
      dialogOpen: true
    });
  };

  handleDialogClose = () => {
    this.props.dispatch({
      type : LOCAL_TRAINERS_ACTIONS.UNSET_TRAINER_REQUIREMENT_SINGLE
    })
    
    this.setState({
      dialogOpen: false
    });
  };

  getStates = () => {
    let allStates = this.props.localTrainers.allLocalTrainers.map(
      localTrainer => {
        return localTrainer.state;
      }
    );

    return [...new Set(allStates)];
  };

  getCohorts = () => {
    let allCohorts = [];

    this.props.localTrainers.allLocalTrainers.forEach(localTrainer => {
      if (
        localTrainer.state_level_organization.state_level_organization_name ===
        this.state.currentTrainers[0].state_level_organization
          .state_level_organization_name
      ) {
        allCohorts.push(localTrainer.cohort.cohort_name);
      }
    });
    return [...new Set(allCohorts)];
  };

  getStateOrgsAndCohort = () => {
    let stateOrgs = this.state.currentTrainers.map(localTrainer => {
      return localTrainer.state_level_organization
        .state_level_organization_name;
    });

    return [...new Set(stateOrgs)];
  };

  filterBy = filterObject => {
    let filteredLocalTrainers = this.props.localTrainers.allLocalTrainers.filter(
      localTrainer => {
        if (filterObject.cohortPicked !== "") {
          if (
            localTrainer.cohort.cohort_name === filterObject.cohortPicked &&
            localTrainer.state === filterObject.statePicked &&
            localTrainer.state_level_organization
              .state_level_organization_name === filterObject.stateOrgPicked
          ) {
            return localTrainer;
          }
        } else if (filterObject.stateOrgPicked !== "") {
          if (
            localTrainer.state === filterObject.statePicked &&
            localTrainer.state_level_organization
              .state_level_organization_name === filterObject.stateOrgPicked
          ) {
            return localTrainer;
          }
        } else if (filterObject.statePicked !== "") {
          if (localTrainer.state === filterObject.statePicked) {
            return localTrainer;
          }
        }
      }
    );

    this.setState({
      currentTrainers: filteredLocalTrainers,
      checkedIDs: []
    });
  };

  handleChecked = local_trainer_id => {
    console.log(local_trainer_id);
    if (local_trainer_id === "selectAll") {
      let allIds = this.state.currentTrainers.map(trainer => {
        return trainer.local_trainers_id;
      });
      if (allIds.length === this.state.checkedIDs.length) {
        this.setState({
          checkedIDs: []
        });
      } else {
        this.setState({
          checkedIDs: allIds
        });
      }
    } else {
      let filteredIDs = this.state.checkedIDs.filter(id => {
        return id !== local_trainer_id;
      });

      if (filteredIDs.length === this.state.checkedIDs.length) {
        this.setState({
          checkedIDs: [...this.state.checkedIDs, local_trainer_id]
        });
      } else {
        this.setState({
          checkedIDs: filteredIDs
        });
      }
    }
  };

  handleMarkComplete = data => {
    let payload = {
      ...data,
      localTrainerIDs: this.state.checkedIDs
    };

    this.props.dispatch({
      type: LOCAL_TRAINERS_ACTIONS.MARK_COMPLETE,
      payload: payload
    });
  };

  handleScheduling = data => {
    let payload = {
      ...data,
      localTrainerIDs: this.state.checkedIDs
    };

    this.props.dispatch({
      type: LOCAL_TRAINERS_ACTIONS.SCHEDULE_FOR_REQUIREMENT,
      payload: payload
    });
  };

  handleSearch = searchKey => {
    if (this.state.searchKey === "") {
      this.setState({
        trainersBeforeSearch: this.state.currentTrainers
      });
    }

    this.setState(
      {
        searchKey: searchKey
      },
      () => {
        this.filterCurrentTrainersWithSearchKey();
      }
    );
  };

  filterCurrentTrainersWithSearchKey = () => {
    let flag = false;
    console.log(this.state.trainersBeforeSearch);

    let filteredTrainers = this.state.trainersBeforeSearch.filter(
      localTrainer => {
        flag = false;
        let checkStringEquality = object => {
          Object.keys(object).forEach(key => {
            if (typeof object[key] === "string" || typeof object[key] === 'number') {
              if (object[key].toString().toLowerCase().includes(this.state.searchKey.toLowerCase())) {
                console.log(object[key].toString().toLowerCase() + ' includes ' + this.state.searchKey);
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
      currentTrainers : filteredTrainers
    })
  };

  render() {
    let { classes } = this.props;
    let states, cohorts, stateOrgs;

    if (this.state.currentTrainers.length !== 0) {
      states = this.getStates();
      cohorts = this.getCohorts();
      stateOrgs = this.getStateOrgsAndCohort();
    }

    return (
      <div>
        <div className={classes.mainComponent}>
          <div className={classes.leftPanel}>
            {this.state.checkedIDs.length !== 0 && (
              <Scheduler
                handleMarkComplete={this.handleMarkComplete}
                handleScheduling={this.handleScheduling}
              />
            )}
           
            {this.state.checkedIDs.length === 0 &&  <Typography className={classes.note}>*Note <br/> Click on Checkboxes to Schedule or Mark Complete</Typography>}
            <CohortManagerFilter
              states={states}
              stateOrgs={stateOrgs}
              cohorts={cohorts}
              filterBy={this.filterBy}
            />
          </div>
          <div className={classes.rightPanel}>
            <div className={classes.searchAndExport}>
              <CohortManagerTableSearch
                searchKey={this.state.searchKey}
                search={this.handleSearch}
              />
              <div>
                <Button className={classes.export}>Export</Button>
              </div>
            </div>
            <CohortManagerTable
              onCellClick={this.handleCellClick}
              currentTrainers={this.state.currentTrainers}
              handleChecked={this.handleChecked}
              checkedIDs={this.state.checkedIDs}
            />
            {this.state.dialogOpen && (
              <CohortManagerModal
                dialogOpen={this.state.dialogOpen}
                handleDialgClose={this.handleDialogClose}
                cellInfo={this.state.cellInfo}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const componentWithStyle = withStyles(styles)(CohortManager);
export default connect(mapStateToProps)(componentWithStyle);
