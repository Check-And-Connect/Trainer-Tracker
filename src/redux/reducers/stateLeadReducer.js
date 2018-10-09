import { combineReducers } from 'redux';
import {STATE_LEAD_ACTIONS} from '../actions/stateLeadActions';

const state_lead = (state = [], action) => {
    switch (action.type) {
        case STATE_LEAD_ACTIONS.STATE_LEAD:
            return action.payload
        default:
            return state;
    }
};

const stateLead_dropDown = (state = [], action) => {
    switch (action.type) {
        case STATE_LEAD_ACTIONS.STATE_LEAD:
            return action.payload
        case STATE_LEAD_ACTIONS.FILTER_STATE_LEAD:
            let newCohort = [];
            for (let i = 0; i < state.length; i++) {
                if (state[i].state_level_organization_ref_id === action.payload) {
                    newCohort.push(state[i]);
                }
            }
            return newCohort;
        default:
            return state;
    }
};

export default combineReducers({
    state_lead,
    stateLead_dropDown
});