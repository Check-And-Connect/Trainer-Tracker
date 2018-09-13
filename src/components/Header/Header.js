import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { USER_ACTIONS } from "../../redux/actions/userActions";
import { triggerLogout } from "../../redux/actions/loginActions";

const mapStateToProps = state => ({
  user: state.user
});

class Header extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  };
  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div className="welcome">
          {/* <h5
            id="welcome"
          >
            Hello, { this.props.user.userName }!
          </h5> */}
          {/* <p>Your ID is: {this.props.user.id}</p> */}
          {/* <button className="logOut"
            onClick={this.logout}
          >
            Log Out
          </button> */}
        </div>
      );
    }

    return (
      <div className="instructions">
        <div>
          <h1 className="lead">{content}</h1>
          {/* <img className="logo" src={require('../../styles/images/checkconnect_logo_h_rgb.jpg')} /> */}
          {/* <img className="person" src={require('../../styles/images/person_icon.jpg')} /> */}

          {/* <Nav /> */}

          <div className="wrapper">
            <div className="item item1">
              {" "}
              <img
                className="logo"
                src={require("../../styles/images/checkconnect_logo_h_rgb.jpg")}
              />
            </div>
            <div className="hSplit">
              <div className="item item3">
                <div className="item3a" />
                <div className="item3b">
                  {/* <div className="item3b1">3b1</div> */}
                  <div className="item3b2">
                    {/* <h1 id="welcome">Hello, {this.props.user.userName}!</h1> */}
                    {/* <button className="logOut" onClick={this.logout}>
                      Log Out
                    </button>  */}

                    <Link to="/" style={{ textDecoration: "none" }}>
                      {" "}
                      <h5 className="linkText">Account Details</h5>
                    </Link>

                    

                    {/* <a href="#" className="logOut" onClick={this.logout}>
                      Log Out
                    </a> */}
                  </div>
                  <div className="item3b3" />
                </div>
                <div className="item3c">
                  {/* <div className="item3c2">
                    <img
                      className="person"
                      src={require("../../styles/images/person_icon.jpg")}
                    />
                  </div> */}

                  <Link
                      to="#"
                      onClick={this.logout}
                      style={{ textDecoration: "none" }}
                    >
                      <h5 className="linkText">Log Out</h5>
                    </Link>
                  <div className="item3c3" />
                </div>
              </div>
              <div className="item item4">
                <Nav />
              </div>
            </div>
            {/* <div className="item item3">3</div>
          <div className="item item4">4</div>
          <div className="item item5">5</div>
          <div className="item item6">6</div>
          <div className="item item7">7</div>
          <div className="item item8">8</div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Header);
