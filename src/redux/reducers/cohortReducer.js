import { combineReducers } from 'redux';

const state_and_SLO = (state = [], action) => {
    switch (action.type) {
        case 'STATE_AND_STATE_ORG':
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

export default combineReducers({
    state_and_SLO,
    trainer_cohorts
});