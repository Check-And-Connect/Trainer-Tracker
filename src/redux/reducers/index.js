import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import localTrainerReducer from './localTrainerReducer';
import localTrainersReducer from './localTrainersReducer';
import nationalTrainerReducer from './nationalTrainerReducer';
import cohortReducer from './cohortReducer';
import stateLeadReducer from './stateLeadReducer';

const store = combineReducers({
  user,
  login,
  localTrainerReducer,
  localTrainersReducer,
  nationalTrainerReducer,
  cohortReducer,
  stateLeadReducer
});

export default store;
