import React, { Component } from "react";
import { connect } from "react-redux";
import { COHORT_ACTIONS } from "../../redux/actions/cohortActions";

import {
  withStyles,
  Typography,
  TextField,
  Button,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Slide,
  Snackbar
} from "@material-ui/core";

const mapStateToProps = state => ({
  user: state.user,
  cohortReducer: state.cohortReducer
});

const styles = {
  mainComponent: {
    display: "Grid",
    justifyContent: "center"
  },
  form: {
    display: "Grid",
    justifyContent: "center"
  }
};

function TransitionRight(props) {
  return <Slide {...props} direction="left" />;
}


class AddStateLevelOrg extends Component {
  state = {
    state: "",
    sloName: "",
    errorMessage: "",
    snackOpen : false,
    
    allStates: [
      {
        name: "Alabama",
        abbreviation: "AL"
      },
      {
        name: "Alaska",
        abbreviation: "AK"
      },
      {
        name: "American Samoa",
        abbreviation: "AS"
      },
      {
        name: "Arizona",
        abbreviation: "AZ"
      },
      {
        name: "Arkansas",
        abbreviation: "AR"
      },
      {
        name: "California",
        abbreviation: "CA"
      },
      {
        name: "Colorado",
        abbreviation: "CO"
      },
      {
        name: "Connecticut",
        abbreviation: "CT"
      },
      {
        name: "Delaware",
        abbreviation: "DE"
      },
      {
        name: "District Of Columbia",
        abbreviation: "DC"
      },
      {
        name: "Federated States Of Micronesia",
        abbreviation: "FM"
      },
      {
        name: "Florida",
        abbreviation: "FL"
      },
      {
        name: "Georgia",
        abbreviation: "GA"
      },
      {
        name: "Guam",
        abbreviation: "GU"
      },
      {
        name: "Hawaii",
        abbreviation: "HI"
      },
      {
        name: "Idaho",
        abbreviation: "ID"
      },
      {
        name: "Illinois",
        abbreviation: "IL"
      },
      {
        name: "Indiana",
        abbreviation: "IN"
      },
      {
        name: "Iowa",
        abbreviation: "IA"
      },
      {
        name: "Kansas",
        abbreviation: "KS"
      },
      {
        name: "Kentucky",
        abbreviation: "KY"
      },
      {
        name: "Louisiana",
        abbreviation: "LA"
      },
      {
        name: "Maine",
        abbreviation: "ME"
      },
      {
        name: "Marshall Islands",
        abbreviation: "MH"
      },
      {
        name: "Maryland",
        abbreviation: "MD"
      },
      {
        name: "Massachusetts",
        abbreviation: "MA"
      },
      {
        name: "Michigan",
        abbreviation: "MI"
      },
      {
        name: "Minnesota",
        abbreviation: "MN"
      },
      {
        name: "Mississippi",
        abbreviation: "MS"
      },
      {
        name: "Missouri",
        abbreviation: "MO"
      },
      {
        name: "Montana",
        abbreviation: "MT"
      },
      {
        name: "Nebraska",
        abbreviation: "NE"
      },
      {
        name: "Nevada",
        abbreviation: "NV"
      },
      {
        name: "New Hampshire",
        abbreviation: "NH"
      },
      {
        name: "New Jersey",
        abbreviation: "NJ"
      },
      {
        name: "New Mexico",
        abbreviation: "NM"
      },
      {
        name: "New York",
        abbreviation: "NY"
      },
      {
        name: "North Carolina",
        abbreviation: "NC"
      },
      {
        name: "North Dakota",
        abbreviation: "ND"
      },
      {
        name: "Northern Mariana Islands",
        abbreviation: "MP"
      },
      {
        name: "Ohio",
        abbreviation: "OH"
      },
      {
        name: "Oklahoma",
        abbreviation: "OK"
      },
      {
        name: "Oregon",
        abbreviation: "OR"
      },
      {
        name: "Palau",
        abbreviation: "PW"
      },
      {
        name: "Pennsylvania",
        abbreviation: "PA"
      },
      {
        name: "Puerto Rico",
        abbreviation: "PR"
      },
      {
        name: "Rhode Island",
        abbreviation: "RI"
      },
      {
        name: "South Carolina",
        abbreviation: "SC"
      },
      {
        name: "South Dakota",
        abbreviation: "SD"
      },
      {
        name: "Tennessee",
        abbreviation: "TN"
      },
      {
        name: "Texas",
        abbreviation: "TX"
      },
      {
        name: "Utah",
        abbreviation: "UT"
      },
      {
        name: "Vermont",
        abbreviation: "VT"
      },
      {
        name: "Virgin Islands",
        abbreviation: "VI"
      },
      {
        name: "Virginia",
        abbreviation: "VA"
      },
      {
        name: "Washington",
        abbreviation: "WA"
      },
      {
        name: "West Virginia",
        abbreviation: "WV"
      },
      {
        name: "Wisconsin",
        abbreviation: "WI"
      },
      {
        name: "Wyoming",
        abbreviation: "WY"
      }
    ]
  };
  componentDidUpdate(prevProps) {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push("home");
    }


    if (
      prevProps.cohortReducer.taskConfirmer.slo_created === false &&
      this.props.cohortReducer.taskConfirmer.slo_created === true
    ) {
      this.setState({
        snackOpen: true
      });
    }
  }

  handleChangeFor = property => event => {
    this.setState({
      [property]: event.target.value,
      errorMessage: ""
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.sloName === "") {
      this.setState({
        errorMessage: "Please Enter the name of the SLO"
      });
    } else if (this.state.state === "") {
      this.setState({
        errorMessage: "Please choose a state before you submit"
      });
    } else {
      this.setState({
        errorMessage: ""
      });

      this.props.dispatch({
        type: COHORT_ACTIONS.ADD_SLO,
        payload: {
          name: this.state.sloName,
          state: this.state.state
        }
      });
    }
  };

  handleClose = () => {
    this.setState({ snackOpen: false });
  };

  render() {
    let { classes } = this.props;
    console.log(this.state.state);

    let states = this.state.allStates.map((state, index) => {
      return (
        <MenuItem key={index} value={state.abbreviation}>
          {state.name}
        </MenuItem>
      );
    });
    return (
      <div className={classes.mainComponent}>
        <form onSubmit={this.handleSubmit} className={classes.form}>
          <Typography variant="display1">
            Add New State Level Organization
          </Typography>

          <TextField
            label="Name of State Level Organizaton"
            className={classes.input}
            value={this.state.sloName}
            onChange={this.handleChangeFor("sloName")}
            margin="normal"
          />

          <FormControl>
            <InputLabel>Pick A State</InputLabel>
            <Select
              value={this.state.state}
              className={classes.input}
              onChange={this.handleChangeFor("state")}
            >
              {states}
            </Select>
          </FormControl>
          <br />

          <div>
            <Button type="submit" variant="outlined">
              Create
            </Button>
            <Typography variant="subheading" color="error">
              {this.state.errorMessage}
            </Typography>
          </div>
        </form>
        <Snackbar
              open={this.state.snackOpen}
              onClose={this.handleClose}
              TransitionComponent={TransitionRight}
              message={<span> Cohort Created</span>}
            />
      </div>
    );
  }
}

let componentWithStyle = withStyles(styles)(AddStateLevelOrg);
export default connect(mapStateToProps)(componentWithStyle);
