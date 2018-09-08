import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core";

import Nav from "../../components/Nav/Nav";
import { USER_ACTIONS } from "../../redux/actions/userActions";
import { LOCAL_TRAINERS_ACTIONS } from "../../redux/actions/localTrainerActions";
import { COHORT_ACTIONS } from "../../redux/actions/cohortActions";
import CohortManagerFilter from "../CohortManagerFilter/CohortManagerFilter";
import Scheduler from "../Scheduler/Scheduler";
import CohortManagerTable from "../CohortManagerTable/CohortManagerTable";
import SearchCohortTable from "../SearchCohortTable/SearchCohortTable";
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
    gridTemplateRows: "0.3fr 1fr"
  },
  rightPanel: {
    display: "Grid",
    gridTemplateRows: "1fr 9fr",
    backgroundColor: "yellow"
  }
};
class CohortManager extends Component {
  state = {
    currentTrainers: [],
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
    checkedIDs: []
  };

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({ type: LOCAL_TRAINERS_ACTIONS.FETCH_LOCAL_TRAINERS });
    // this.props.dispatch({type : NATIONAL_TRAINERS_ACTIONS.FETCH_NATIONAL_TRAINERS})
    this.props.dispatch({ type: COHORT_ACTIONS.FETCH_REQUIREMENTS });
    // this.props.dispatch({type : COHORT_ACTIONS.FETCH_COHORTS})
    // this.props.dispatch({type : COHORT_ACTIONS.FETCH_SLOS})
    this.setState({
      currentTrainers: this.props.localTrainers.allLocalTrainers
    });
  }

  componentDidUpdate(prevProps) {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push("home");
    }

    if (
      prevProps.localTrainers.allLocalTrainers.length !==
      this.props.localTrainers.allLocalTrainers.length
    ) {
      this.setState({
        currentTrainers: this.props.localTrainers.allLocalTrainers
      });
    }
  }

  handleCellClick = (localTrainerId, requirementId) => {
    console.log("trainer id " + localTrainerId);
    console.log("req id " + requirementId);

    this.setState({
      cellInfo: {
        localTrainerId: localTrainerId,
        requirementId: requirementId
      },
      dialogOpen: true
    });

    console.log("cell clicked");
  };

  handleDialogClose = () => {
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

  handleMarkComplete = (data) => {
    console.log('mark mark');
    console.log(data);

    let payload = {
      ...data,
      localTrainerIDs : this.state.checkedIDs
    }

    this.props.dispatch({
      type : LOCAL_TRAINERS_ACTIONS.MARK_COMPLETE,
      payload : payload
    })
    
  }

  handleScheduling = (data) => {
    console.log('mark schedule');
    
    let payload = {
      ...data,
      localTrainerIDs : this.state.checkedIDs
    }

    this.props.dispatch({
      type : LOCAL_TRAINERS_ACTIONS.SCHEDULE_FOR_REQUIREMENT,
      payload : payload
    })
    console.log(data);
    
  }
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
            <CohortManagerFilter
              states={states}
              stateOrgs={stateOrgs}
              cohorts={cohorts}
              filterBy={this.filterBy}
            />
          </div>
          <div className={classes.rightPanel}>
            <SearchCohortTable />
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
