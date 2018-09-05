import { combineReducers } from 'redux';
import { LOCAL_TRAINERS_ACTIONS } from '../actions/localTrainerActions';

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
  
  const trainer_cohorts = (state = [], action) => {
    switch (action.type) {
      case 'TRAINER_COHORTS':
        return action.payload
      default:
        return state;
    }
  };

  const allLocalTrainers  = (state = [], action) => {
    switch (action.type) {
        case LOCAL_TRAINERS_ACTIONS.SET_LOCAL_TRAINERS:
            return action.payload || state
    
        default:
            return state;
    }
}

  export default combineReducers({
    state_and_SLO,
    state_lead,
    trainer_cohorts, 
    allLocalTrainers
  });
