import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import localTrainers from './localTrainersReducer';
const store = combineReducers({
  user,
  login,
  localTrainers
});

export default store;
