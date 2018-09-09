import { combineReducers } from 'redux';
import { NATIONAL_TRAINER_ACTIONS } from '../actions/nationalTrainerActions';


const allNationalTrainers = (state = [], action) => {
    switch (action.type) {
        case NATIONAL_TRAINER_ACTIONS.SET_ALL_NATIONAL_TRAINERS:
            return action.payload
        default:
            return state;
    }
};

export default combineReducers({
    allNationalTrainers
});