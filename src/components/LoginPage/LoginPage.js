import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  triggerLogin,
  formError,
  clearError
} from "../../redux/actions/loginActions";
import { USER_ACTIONS } from "../../redux/actions/userActions";

import { withStyles, Button, Paper, TextField } from "@material-ui/core";

const mapStateToProps = state => ({
  user: state.user,
  login: state.login
});

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
    return (
      <div className="outer-div">
      <div className="loginContainer">
        <img
          className="logo"
          src={require("../../styles/images/checkconnect_logo_h_rgb.jpg")}
        />
        {this.renderAlert()}
        <form onSubmit={this.login}>
          <h3></h3>
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
            <input
              type="submit"
              name="submit"
              value="Log In"
            />
            <Link to="/confrim_email">Forgot Password</Link>
          </div>
        </form>
      </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(LoginPage);
