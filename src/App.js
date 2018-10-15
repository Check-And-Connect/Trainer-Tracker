import React from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";


import { connect } from 'react-redux';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
// import RegisterPage from './components/RegisterPage/RegisterPage';
// import UserPage from './components/UserPage/UserPage';
// import InfoPage from './components/InfoPage/InfoPage';
import CohortManager from './components/CohortManager/CohortManager'
import AddTrainer from './components/AddTrainer/AddTrainer';
import TrainerSearchView from './components/TrainerSearchView/TrainerSearchView';
import TrainerDetails from './components/TrainerDetails/TrainerDetails';
import NationalTrainer from './components/NationalTrainer/NationalTrainer';
import CohortDetails from './components/CohortDetails/CohortDetails'
import AddCohort from './components/AddCohort/AddCohort';
import AccountDetails from './components/AccountDetails/AccountDetails';
import AddStateLevelOrg from './components/AddStateLevelOrg/AddStateLevelOrg';
import ResetPassword from "./components/ResetPassword/ResetPassword";
import ConfirmEmail from "./components/ConfirmEmail/ConfirmEmail";
import EditRequirements from "./components/EditRequirements/EditRequirements";
import './styles/main.css';

const mapStateToProps = state => ({
  user: state.user
})

const App = (props) => (
  <div>
    <Router>
      <div>

      {props.user.id && <Header title="" />}
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route exact path="/password_reset/:token" component={ResetPassword} />
        <Route exact path="/confrim_email" component={ConfirmEmail} />

        <Route
          path="/national_trainer"
          component={NationalTrainer}
        />
        {/* <Route
          path="/user"
          component={UserPage}
        /> */}
        <Route
          path="/cohort_manager"
          component={CohortManager}
        />
        <Route
          path="/addtrainer"
          component={AddTrainer}
        />
        <Route
          path="/trainersearch"
          component={TrainerSearchView}
        />
        <Route
          path="/trainerdetails/:id"
          component={TrainerDetails}
        />
        <Route path="/cohort/:cohort_id" 
        component={CohortDetails}
        />
        <Route
          path="/addcohort"
          component={AddCohort}
        />
        <Route
          path="/state_level_org"
          component={AddStateLevelOrg}
        />
        <Route
          path="/accountdetails"
          component={AccountDetails}
        />
        <Route
          path="/editrequirements"
          component={EditRequirements}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

        </Switch>
      </div>
    </Router>
  </div>
);

export default connect(mapStateToProps)(App);
