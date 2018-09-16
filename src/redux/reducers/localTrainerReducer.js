import { combineReducers } from 'redux';
import { LOCAL_TRAINERS_ACTIONS } from '../actions/localTrainerActions';
  

  const allLocalTrainers  = (state = [], action) => {
    switch (action.type) {
        case LOCAL_TRAINERS_ACTIONS.SET_LOCAL_TRAINERS:
            return action.payload || state
        case LOCAL_TRAINERS_ACTIONS.UNSET_LOCAL_TRAINERS: 
            return []
        default:
            return state;
    }
}
  
  const singleTrainerReqInfo =  (state = [], action) => {
  switch (action.type) {
      case LOCAL_TRAINERS_ACTIONS.SET_TRAINER_REQUIREMENT_SINGLE:
          return action.payload || state
      case LOCAL_TRAINERS_ACTIONS.UNSET_TRAINER_REQUIREMENT_SINGLE: 
          return []
      default:
          return state;
  }
}

const exportArray =  (state = [], action) => {
    switch (action.type) {
        case LOCAL_TRAINERS_ACTIONS.EXPORT_LOCAL_TRAINERS:
            return action.payload
        default:
            return state;
    }
  }


export default combineReducers({
  allLocalTrainers,
  singleTrainerReqInfo,
  exportArray
});



