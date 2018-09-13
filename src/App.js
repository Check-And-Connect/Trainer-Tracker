import React from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Header from "./components/Header/Header";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import UserPage from "./components/UserPage/UserPage";
// import InfoPage from './components/InfoPage/InfoPage';
import CohortManager from "./components/CohortManager/CohortManager";
import AddTrainer from "./components/AddTrainer/AddTrainer";
import TrainerSearchView from "./components/TrainerSearchView/TrainerSearchView";
import TrainerDetails from "./components/TrainerDetails/TrainerDetails";
import NationalTrainer from "./components/NationalTrainer/NationalTrainer";
import AddCohort from "./components/AddCohort/AddCohort";
import AddStateLevelOrg from "./components/AddStateLevelOrg/AddStateLevelOrg";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import ConfirmEmail from "./components/ConfirmEmail/ConfirmEmail";
import "./styles/main.css";

const App = () => (
  <div>
    <Router>
      <div>
        <Header title="" />
        <Switch>
        <Route exact path="/password_reset/:token" component={ResetPassword} />
         
          <Route exact path="/home" component={LoginPage} />
          <Route exact path="/confrim_email" component={ConfirmEmail} />
          
          <Route exact path="/national_trainer" component={NationalTrainer} />
          <Route exact path="/user" component={UserPage} />
          <Route exact path="/cohort_manager" component={CohortManager} />
          <Route exact path="/addtrainer" component={AddTrainer} />
          <Route exact path="/trainersearch" component={TrainerSearchView} />
          <Route exact path="/trainerdetails/:id" component={TrainerDetails} />
          <Route exact path="/addcohort" component={AddCohort} />
          <Route exact path="/state_level_org" component={AddStateLevelOrg} />
          <Redirect exact from="/" to="/home" />
          {/* OTHERWISE (no path!) */}
          <Route render={() => <h1>404</h1>} />
        </Switch>
      </div>
    </Router>
  </div>
);

export default App;
