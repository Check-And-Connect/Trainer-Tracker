import React, { Component } from "react";
import {
  withStyles,
  IconButton
} from "@material-ui/core";

import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const styles = theme => ({
  cyclePicker: {
    display: "Grid",
    gridTemplateColumns: "0fr 0fr 0.01fr 0fr",
    justifyContent: "center",
    alignItems: "center"
  },
  arrows: {
    fontSize: "2em"
  },
  cycleDisplayed: {
    fontSize: "1.5em"
  }
});

class CohortManagerCyclePicker extends Component {
  previousCycle = () => {
    let prevCycle = parseInt(this.props.cyclePickerInfo.cycleDisplayed) - 1;

    this.props.changeCycleDisplayed(prevCycle)
  };

  nextCycle = () => {
    let nextCycle = parseInt(this.props.cyclePickerInfo.cycleDisplayed) + 1;

    this.props.changeCycleDisplayed(nextCycle)
  };

  render() {
    let { classes } = this.props;

    return (
      <div className={classes.cyclePicker}>
        <p>Cycle</p>
        <IconButton
          disabled={parseInt(this.props.cyclePickerInfo.cycleDisplayed) === 1}
          onClick={this.previousCycle}
        >
          <KeyboardArrowLeft className={classes.arrows} />
        </IconButton>
        <p className={classes.cycleDisplayed}>{this.props.cyclePickerInfo.cycleDisplayed}</p>
        <IconButton
          disabled={
            parseInt(this.props.cyclePickerInfo.cycleDisplayed) ===
            parseInt(this.props.cyclePickerInfo.currentCohortCycle)
          }
          onClick={this.nextCycle}
        >
          <KeyboardArrowRight className={classes.arrows} />
        </IconButton>
      </div>
    );
  }
}

const styledComponent = withStyles(styles)(CohortManagerCyclePicker);
export default styledComponent;
