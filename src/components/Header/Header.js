import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
  user: state.user,
});

class Header extends Component  {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      // this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }
  render () {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div className="welcome">
          <h5
            id="welcome"
          >
            Hello, { this.props.user.userName }!
          </h5>
          {/* <p>Your ID is: {this.props.user.id}</p> */}
          <button
            onClick={this.logout}
          >
            Log Out
          </button>
        </div>
      );
    }

    return (
      <div className="instructions">
        <div>
          <h1 className="lead">{ content }</h1>
          <img className="logo" src={require('../../styles/images/checkconnect_logo_h_rgb.jpg')} />
          <img className="person" src={require('../../styles/images/person_icon.jpg')} />
        </div>
      </div>
      )
  }


};

export default connect(mapStateToProps)(Header);
