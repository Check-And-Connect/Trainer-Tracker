import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core";

import Nav from "../../components/Nav/Nav";
import { USER_ACTIONS } from "../../redux/actions/userActions";
import { LOCAL_TRAINERS_ACTIONS } from '../../redux/actions/localTrainerActions';
import { COHORT_ACTIONS } from '../../redux/actions/cohortActions';
import CohortManagerFilter from "../CohortManagerFilter/CohortManagerFilter";
import Scheduler from "../Scheduler/Scheduler";
import CohortManagerTable from "../CohortManagerTable/CohortManagerTable";
import SearchCohortTable from "../SearchCohortTable/SearchCohortTable";
import CohortManagerModal from "../CohortManagerModal/CohortManagerModal";


const mapStateToProps = state => ({
  user: state.user,
  localTrainers : state.localTrainerReducer
});

const styles = {
  mainComponent: {
    display: "Grid",
    gridTemplateColumns: "1fr 4fr"
  },
  leftPanel: {
    display: "Grid",
    gridTemplateRows: "3fr 1fr",
    backgroundColor: "red"
  },
  rightPanel: {
    display : "Grid",
    gridTemplateRows:"1fr 9fr",
    backgroundColor: "yellow"
  }
};
class CohortManager extends Component {

  state = {
    currentTrainers : [],
    cellInfo : {
      localTrainerId : 0,
      requirementId : 0
    },
    dialogOpen : false
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({type : LOCAL_TRAINERS_ACTIONS.FETCH_LOCAL_TRAINERS})
    // this.props.dispatch({type : NATIONAL_TRAINERS_ACTIONS.FETCH_NATIONAL_TRAINERS})
    // this.props.dispatch({type : REQUIREMENTS.FETCH_REQUIREMENTS})
    // this.props.dispatch({type : COHORT_ACTIONS.FETCH_COHORTS})
    this.props.dispatch({type : COHORT_ACTIONS.FETCH_STATE_LEVEL_ORG})
    this.setState({
      currentTrainers : this.props.localTrainers.allLocalTrainers
    })

  }

  componentDidUpdate(prevProps) {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push("home");
    }

    if(prevProps.localTrainers.allLocalTrainers.length !== this.props.localTrainers.allLocalTrainers.length) {
      this.setState({
        currentTrainers : this.props.localTrainers.allLocalTrainers
      })

    }
  }

  handleCellClick = (localTrainerId, requirementId) => {
    console.log('trainer id ' + localTrainerId);
    console.log('req id ' + requirementId);

    this.setState({
      cellInfo : {
        localTrainerId : localTrainerId,
        requirementId : requirementId
      },
      dialogOpen : true
    })
    
    console.log('cell clicked');
    
    
  }

  handleDialogClose = () => {
    this.setState({
      dialogOpen : false
    })
  }

  render() {
    let { classes } = this.props;

    return (
      <div>
        <Nav />
        <div className={classes.mainComponent}>
          <div className={classes.leftPanel}>
            <CohortManagerFilter/>
            <Scheduler/>
          </div>
          <div className={classes.rightPanel}> 
            <SearchCohortTable/>
            <CohortManagerTable onCellClick={this.handleCellClick} currentTrainers={this.state.currentTrainers}/>
            {this.state.dialogOpen &&
            <CohortManagerModal dialogOpen={this.state.dialogOpen} handleDialgClose={this.handleDialogClose} cellInfo={this.state.cellInfo}/>
            }
          </div>
        </div>
      </div>
    );
  }
}

const componentWithStyle = withStyles(styles)(CohortManager);
export default connect(mapStateToProps)(componentWithStyle);
