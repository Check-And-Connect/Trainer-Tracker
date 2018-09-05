import { combineReducers } from 'redux';

const state_lead = (state = [], action) => {
    switch (action.type) {
        case 'STATE_LEAD':
            return action.payload
        default:
            return state;
    }
};

export default combineReducers({
    state_lead
});