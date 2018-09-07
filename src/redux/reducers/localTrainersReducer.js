import { combineReducers } from 'redux';
import { LOCAL_TRAINERS_ACTIONS } from '../actions/localTrainerActions';

const allLocalTrainers  = (state = [], action) => {
    switch (action.type) {
        case LOCAL_TRAINERS_ACTIONS.SET_LOCAL_TRAINERS:
            return action.payload || state
    
        default:
            return state;
    }
}

const localTrainerDetails = (state = null, action) => {
    switch (action.type) {
        case LOCAL_TRAINERS_ACTIONS.SET_LOCAL_TRAINER_DETAILS:
            return action.payload || state
        
            default:
                return state;
    }
}



export default combineReducers({
    allLocalTrainers,
    localTrainerDetails
})