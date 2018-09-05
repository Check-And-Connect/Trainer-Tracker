import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';

const state_and_SLO = (state = [], action) => {
  switch (action.type) {
    case 'STATE_AND_STATE_ORG':
      return action.payload
    default:
      return state;
  }
};

const state_lead = (state = [], action) => {
  switch (action.type) {
    case 'STATE_LEAD':
      return action.payload
    default:
      return state;
  }
};

const store = combineReducers({
  user,
  login,
  state_and_SLO,
  state_lead 
});

export default store;
