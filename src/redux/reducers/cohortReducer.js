import { combineReducers } from 'redux';
import { COHORT_ACTIONS } from '../actions/cohortActions';

const state_and_SLO = (state = [], action) => {
    switch (action.type) {
        case COHORT_ACTIONS.STATE_AND_STATE_ORG:
            return action.payload
        case COHORT_ACTIONS.FILTER_STATE:
            let newState = [];
            for (let i = 0; i < state.length; i++) {
                if (state[i].state === action.payload) {
                    newState.push(state[i]);
                }
            }
            return newState;
        default:
            return state;
    }
};

const trainer_cohorts = (state = [], action) => {
    switch (action.type) {
        case COHORT_ACTIONS.TRAINER_COHORTS:
            return action.payload
        default:
            return state;
    }
};

export default combineReducers({
    state_and_SLO,
    trainer_cohorts
}); 

