import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core";

import Nav from "../../components/Nav/Nav";
import { USER_ACTIONS } from "../../redux/actions/userActions";
import { LOCAL_TRAINERS_ACTIONS } from '../../redux/actions/localTrainersAction';
import CohortManagerFilter from "../CohortManagerFilter/CohortManagerFilter";
import Scheduler from "../Scheduler/Scheduler";

const mapStateToProps = state => ({
  user: state.user
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
    backgroundColor: "yellow"
  }
};
class CohortManager extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({type : LOCAL_TRAINERS_ACTIONS.FETCH_LOCAL_TRAINERS})
    // this.props.dispatch({type : NATIONAL_TRAINERS_ACTIONS.FETCH_NATIONAL_TRAINERS})
    // this.props.dispatch({type : REQUIREMENTS.FETCH_REQUIREMENTS})
    // this.props.dispatch({type : COHORT_ACTIONS.FETCH_COHORTS})
    // this.props.dispatch({type : SLO_ACTIONS.FETCH_SLOS})

  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push("home");
    }
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
          <div className={classes.rightPanel}> this is something </div>
        </div>
      </div>
    );
  }
}

const componentWithStyle = withStyles(styles)(CohortManager);
export default connect(mapStateToProps)(componentWithStyle);
