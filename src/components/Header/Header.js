import React, { Component } from "react";
import { connect } from "react-redux";
import Nav from "../../components/Nav/Nav";
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
    return (
      <div className="instructions">
        <div>
          <div className="wrapper">
            <div className="item item1">
              {" "}
              <img
                className="logo"
                src={require("../../styles/images/checkconnect_logo_h_rgb.jpg")}
                alt="check and connect logo"
              />
            </div>
            <div className="hSplit">
              <div className="item item3">
                <div className="item3a" />
                <div className="item3b">
                  <div className="item3b2">
                    <Link to="/accountdetails" style={{ textDecoration: "none" }}>
                      {" "}
                      <h5 className="linkText">Account Details</h5>
                    </Link>

                  </div>
                  <div className="item3b3" />
                </div>
                <div className="item3c">
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
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Header);
