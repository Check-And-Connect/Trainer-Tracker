import { combineReducers } from "redux";
import { COHORT_ACTIONS } from "../actions/cohortActions";

const state_dropDown = (state = [], action) => {
  switch (action.type) {
    case COHORT_ACTIONS.STATE_LIST:
      let stateSet = new Set();
      for (let i = 0; i < action.payload.length; i++) {
        stateSet.add(action.payload[i].state);
      }
      let newStateArray = Array.from(stateSet);
      return newStateArray;
    default:
      return state;
  }
};

const SLO_dropDown = (state = [], action) => {
  switch (action.type) {
    case COHORT_ACTIONS.STATE_AND_STATE_ORG:
      return action.payload;
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

const cohort_dropDown = (state = [], action) => {
  switch (action.type) {
    case COHORT_ACTIONS.TRAINER_COHORTS:
      return action.payload;
    case COHORT_ACTIONS.FILTER_SLO:
      let newCohort = [];
      for (let i = 0; i < state.length; i++) {
        if (state[i].state_level_organization_ref_id == action.payload) {
          newCohort.push(state[i]);
        }
      }
      return newCohort;
    default:
      return state;
  }
};

const trainer_cohorts = (state = [], action) => {
  switch (action.type) {
    case COHORT_ACTIONS.TRAINER_COHORTS:
      return action.payload;

    default:
      return state;
  }
};

const requirements = (state = [], action) => {
  switch (action.type) {
    case COHORT_ACTIONS.SET_REQUIREMENTS:
      return action.payload;
    case COHORT_ACTIONS.UNSET_REQUIREMENTS:
      return [];
    default:
      return state;
  }
};

export default combineReducers({
  state_dropDown,
  SLO_dropDown,
  trainer_cohorts,
  cohort_dropDown,
  requirements
});
