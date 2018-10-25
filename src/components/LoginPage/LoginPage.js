import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  triggerLogin,
  formError,
  clearError
} from "../../redux/actions/loginActions";
import { USER_ACTIONS } from "../../redux/actions/userActions";

import { Button, TextField, Paper, withStyles } from "@material-ui/core";
import Background from './CC-background.png';


const mapStateToProps = state => ({
  user: state.user,
  login: state.login
});


const styles = {
  wholePage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundImage: "url(" + Background + ")",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right top",
    backgroundAttachment: "fixed",
  },
  mainComponent: {
    display: "grid", 
    gridTemplateColumns: "2fr 7fr 2fr",
    alignItems: "center",
    justifyContent: "center",
  },
  loginContainer: {
    // backgroundColor: "white",
    gridColumnStart: "2",
    marginTop: "50px",
    display: "grid",
    justifyItems: "center"
  },
  formContainer: {
    width: "340px",
    margin: "30px"
  },
  bigLogo: {
    width: "100%",
    height: "auto"
  }
}

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch(clearError());
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName !== null) {
      this.props.history.push("trainersearch");
    }
  }

  login = event => {
    event.preventDefault();

    if (this.state.username === "" || this.state.password === "") {
      this.props.dispatch(formError());
    } else {
      this.props.dispatch(
        triggerLogin(this.state.username, this.state.password)
      );
    }
  };

  handleInputChangeFor = propertyName => event => {
    this.setState({
      [propertyName]: event.target.value
    });
  };

  renderAlert() {
    if (this.props.login.message !== "") {
      return (
        <h2 className="alert" role="alert">
          {this.props.login.message}
        </h2>
      );
    }
    return <span />;
  }

  render() {
    let { classes } = this.props;

    return (
      <div className={classes.wholePage}>
      <div className={classes.mainComponent}>
      <div className={classes.loginContainer}>
        <img
          className={classes.bigLogo}
          src={require("./CC-logo.png")}
          alt="big check and connect logo"
        />
        {this.renderAlert()}
        <div className={classes.formContainer}>
        <form onSubmit={this.login}>
          <div>
            <label htmlFor="username">
              Username:
              <TextField
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor("username")}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <TextField
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor("password")}
              />
            </label>
          </div>
          <div>
            <Button
              type="submit"
              name="submit"
              value="Log In"
            >
              Log In
            </Button>
            <Link to="/confrim_email">
            <Button>
              Forgot Password
            </Button>
            </Link>
          </div>
        </form>
        </div>
      </div>
      </div>
      </div>
    );
  }
}

const styledComponent = withStyles(styles)(LoginPage);
export default connect(mapStateToProps)(styledComponent);
