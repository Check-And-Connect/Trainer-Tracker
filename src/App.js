import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
// import InfoPage from './components/InfoPage/InfoPage';
import CohortManager from './components/CohortManager/CohortManager'
import AddTrainer from './components/AddTrainer/AddTrainer';
import TrainerSearchView from './components/TrainerSearchView/TrainerSearchView';
import TrainerDetails from './components/TrainerDetails/TrainerDetails';
import AddCohort from './components/AddCohort/AddCohort';
import './styles/main.css';
const App = () => (
  <div>

    <Router>
      <div>
    <Header title="" />
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/user"
          component={UserPage}
        />
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
        <Route
          path="/addcohort"
          component={AddCohort}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />
        </Switch>
      </div>
    </Router>
  </div>
);

export default App;
