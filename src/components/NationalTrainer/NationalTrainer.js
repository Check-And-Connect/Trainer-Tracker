import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles, Typography } from "@material-ui/core";
import NationalTrainerAdd from "../NationalTrainerAdd/NationalTrainerAdd";
import NationalTrainerList from "../NationalTrainerList/NationalTrainerList";
import { NATIONAL_TRAINER_ACTIONS } from "../../redux/actions/nationalTrainerActions";

const styles = {
  mainComponent: {
    display: "grid",
    gridTemplateRows : "0.5fr 10fr",
    textAlign : "center"
  },
  addAndList : {
      display : "grid",
      gridTemplateColumns : "10fr 0.2fr 10fr",
      paddingTop : '3em'
  }
};

const mapStateToProps = state => {
  
}
class NationalTrainer extends Component {
  componentDidMount() {

    
    this.props.dispatch({
      type: NATIONAL_TRAINER_ACTIONS.FETCH_ALL_NATIONAL_TRAINERS
    });
  }

  

  componentDidUpdate(prevProps) {
      if (!this.props.user.isLoading && this.props.user.userName === null) {
        this.props.history.push("home");
      }
    if(prevProps.nationalTrainers.allNationalTrainers.length === 0 && this.props.nationalTrainers.allNationalTrainers.length !== 0){
      this.props.dispatch({
        type: NATIONAL_TRAINER_ACTIONS.FETCH_ALL_NATIONAL_TRAINERS
      });
    }
  }

  render() {
    let { classes } = this.props;
    return (
      <div className={classes.mainComponent}>
        <div>
          <Typography variant="display1">National Trainer</Typography>
        </div>

        <div className={classes.addAndList}>
          <NationalTrainerAdd />
          <hr />
          <NationalTrainerList />
        </div>
      </div>
    );
  }
}

const componentWithStyle = withStyles(styles)(NationalTrainer);
export default connect(mapStateToProps)(componentWithStyle);
