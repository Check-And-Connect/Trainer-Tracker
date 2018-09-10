import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles, TextField, Button } from "@material-ui/core";
import { NATIONAL_TRAINER_ACTIONS } from "../../redux/actions/nationalTrainerActions";

const mapStateToProps = state => ({
  user: state.user,
  nationalTrainers: state.nationalTrainerReducer
});

const styles = {
  input: {
    width: "20em"
  }
};

export class NationalTrainerAdd extends Component {
  state = {
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    email: "",
    title: ""
  };

  handleInputChange = property => event => {
    console.log(property);
    console.log(event.target.value);

    this.setState({
        [property] : event.target.value
    })
  };

  handleSubmit = (event) => {
      event.preventDefault();

      this.props.dispatch({
          type : NATIONAL_TRAINER_ACTIONS.ADD_NATIONAL_TRAINER,
          payload : this.state
      })
  }

  render() {
    let { classes } = this.props;
    return (
      <div>
        ADD NEW NATIONAL TRAINER
        <form onSubmit={this.handleSubmit}>
          <TextField
            onChange={this.handleInputChange("first_name")}
            className={classes.input}
            required
            label="First Name"
            margin="normal"
          />
          <br />
          <TextField
            onChange={this.handleInputChange("last_name")}
            className={classes.input}
            required
            label="Last Name"
            margin="normal"
          />
          
          <br />
          <TextField
            onChange={this.handleInputChange("email")}
            className={classes.input}
            required
            label="Email"
            margin="normal"
          />
          <br />
          <TextField
            onChange={this.handleInputChange("title")}
            className={classes.input}
            label="Title"
            margin="normal"
          />
          <br />
          <TextField
            onChange={this.handleInputChange("username")}
            className={classes.input}
            required
            label="Username"
            margin="normal"
          />
          <br />
          <TextField
            onChange={this.handleInputChange("password")}
            className={classes.input}
            required
            label="Password"
            margin="normal"
          />
          <br/>
          <br />
          <Button type="submit" variant="outlined">
            Add New Trainer
          </Button>
        </form>
      </div>
    );
  }
}

let componentWithStyle = withStyles(styles)(NationalTrainerAdd);
export default connect(mapStateToProps)(componentWithStyle);
