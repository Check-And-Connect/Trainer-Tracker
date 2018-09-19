import { combineReducers } from "redux";
import { LOCAL_TRAINERS_ACTIONS } from "../actions/localTrainerActions";

const allLocalTrainers = (state = [], action) => {
  switch (action.type) {
    case LOCAL_TRAINERS_ACTIONS.SET_LOCAL_TRAINERS:
      return action.payload || state;
    case LOCAL_TRAINERS_ACTIONS.UNSET_LOCAL_TRAINERS:
      return [];
    default:
      return state;
  }
};

const singleTrainerReqInfo = (state = [], action) => {
  switch (action.type) {
    case LOCAL_TRAINERS_ACTIONS.SET_TRAINER_REQUIREMENT_SINGLE:
      return action.payload || state;
    case LOCAL_TRAINERS_ACTIONS.UNSET_TRAINER_REQUIREMENT_SINGLE:
      return [];
    default:
      return state;
  }
};

const taskConfirmer = (state = {schdule_created : false, completion : false}, action) => {
  switch (action.type) {
    case LOCAL_TRAINERS_ACTIONS.UNSET_CONFRIM_SCHEDULE_CREATED:
      return { ...state, schedule_created: false };
    case LOCAL_TRAINERS_ACTIONS.SET_CONFIRM_SCHEDULE_CREATED:
      return { ...state, schedule_created: true };
    case LOCAL_TRAINERS_ACTIONS.UNSET_CONFIRM_COMPLETION:
      return { ...state, completion: false };
    case LOCAL_TRAINERS_ACTIONS.SET_CONFIRM_COMPLETION:
      return { ...state, completion: true };
    default:
      return state;
  }
};

const exportArray =  (state = [], action) => {
    switch (action.type) {
        case LOCAL_TRAINERS_ACTIONS.EXPORT_LOCAL_TRAINERS:
            return action.payload
        default:
            return state;
    }
  }

const recentlyAdded = (state = '', action) => {
    switch (action.type) {
        case LOCAL_TRAINERS_ACTIONS.SHOW_RECENT_ADD:
            if (action.payload.response.status === 500){
                return 'Failed to add most recent trainer to database'
            } else {
                return state
            }
        default:
            return state;
    }
  }


export default combineReducers({
  allLocalTrainers,
  singleTrainerReqInfo,
  taskConfirmer,
  exportArray,
  recentlyAdded
});
