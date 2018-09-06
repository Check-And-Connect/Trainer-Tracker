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

export default combineReducers({
    state_lead
});