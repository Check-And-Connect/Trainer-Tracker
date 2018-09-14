import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles, Typography, Slide, Snackbar } from "@material-ui/core";
import NationalTrainerAdd from "../NationalTrainerAdd/NationalTrainerAdd";
import NationalTrainerList from "../NationalTrainerList/NationalTrainerList";
import { NATIONAL_TRAINER_ACTIONS } from "../../redux/actions/nationalTrainerActions";

const styles = {
  mainComponent: {
    display: "grid",
    gridTemplateRows: "0.5fr 10fr",
    textAlign: "center"
  },
  addAndList: {
    display: "grid",
    gridTemplateColumns: "10fr 0.2fr 10fr",
    paddingTop: "3em"
  }
};

const mapStateToProps = state => ({
  user: state.user,
  nationalTrainers: state.nationalTrainerReducer
});

function TransitionRight(props) {
  return <Slide {...props} direction="left" />;
}

class NationalTrainer extends Component {
  state = {
    nt_count: 0,
    snackOpen: false
  };

  componentDidMount() {
    this.props.dispatch({
      type: NATIONAL_TRAINER_ACTIONS.FETCH_ALL_NATIONAL_TRAINERS
    });
  }

  componentDidUpdate(prevProps) {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push("home");
    }

    console.log(prevProps.nationalTrainers.allNationalTrainers.length);
    console.log(this.props.nationalTrainers.allNationalTrainers.length);
    if (
      prevProps.nationalTrainers.allNationalTrainers.length === 0 &&
      this.props.nationalTrainers.allNationalTrainers.length !== 0
    ) {
      if (
        this.props.nationalTrainers.allNationalTrainers.length >
          this.state.nt_count &&
        this.state.nt_count === 0
      ) {
        this.setState({
          nt_count: this.props.nationalTrainers.allNationalTrainers.length,

        });
      } else if (
        this.props.nationalTrainers.allNationalTrainers.length >
          this.state.nt_count &&
        this.state.nt_count !== 0
      ) {
        this.setState({
          nt_count: this.props.nationalTrainers.allNationalTrainers.length,
          snackOpen: true
        });
      }

    }
  }

  handleClose = () => {
    this.setState({ snackOpen: false });
  };

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
        <Snackbar
          open={this.state.snackOpen}
          onClose={this.handleClose}
          TransitionComponent={TransitionRight}
          message={<span> New National Trainer Has Been Added</span>}
        />
      </div>
    );
  }
}

const componentWithStyle = withStyles(styles)(NationalTrainer);
export default connect(mapStateToProps)(componentWithStyle);
