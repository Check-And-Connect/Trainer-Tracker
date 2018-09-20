import {
  takeEvery,
  takeLatest,
  call,
  put as dispatch
} from "redux-saga/effects";
import axios from "../../../node_modules/axios";

import { COHORT_ACTIONS } from "../actions/cohortActions";

// get all cohorts from database
function* getCohorts() {
  try {
    const cohortResponse = yield call(axios.get, "/api/cohorts/cohort");
    yield dispatch({
      type: COHORT_ACTIONS.TRAINER_COHORTS,
      payload: cohortResponse.data
    });
  } catch (err) {
    console.log(err);
  }
}

// get only states from database
function* getStates() {
  try {
    const stateResponse = yield call(axios.get, "/api/cohorts/states");
    yield dispatch({
      type: COHORT_ACTIONS.STATE_LIST,
      payload: stateResponse.data
    });
  } catch (err) {
    console.log(err);
  }
}

function* filterSLO(action) {
  try {
    const cohortResponse = yield call(axios.get, "/api/cohorts/cohort");
    yield dispatch({
      type: COHORT_ACTIONS.TRAINER_COHORTS,
      payload: cohortResponse.data
    });
    yield dispatch({
      type: COHORT_ACTIONS.FILTER_SLO,
      payload: action.payload
    });
  } catch (err) {
    console.log(err);
  }
}

// filter state level orgs and states
function* filterState(action) {
  try {
    const stateLevelResponse = yield call(
      axios.get,
      "/api/cohorts/stateLevelOrganization"
    );
    yield dispatch({
      type: COHORT_ACTIONS.STATE_AND_STATE_ORG,
      payload: stateLevelResponse.data
    });
    yield dispatch({
      type: COHORT_ACTIONS.FILTER_STATE,
      payload: action.payload
    });
  } catch (err) {
    console.log(err);
  }
}

function* getStateLevelOrgandState() {
  try {
    const stateLevelResponse = yield call(
      axios.get,
      "/api/cohorts/stateLevelOrganization"
    );
    yield dispatch({
      type: COHORT_ACTIONS.STATE_AND_STATE_ORG,
      payload: stateLevelResponse.data
    });
  } catch (err) {
    console.log(err);
  }
}

function* getRequirements() {
  try {
    yield dispatch({
      type: COHORT_ACTIONS.UNSET_REQUIREMENTS
    });

    const requirements = yield call(axios.get, "/api/cohorts/requirements");
    console.log(requirements);

    yield dispatch({
      type: COHORT_ACTIONS.SET_REQUIREMENTS,
      payload: requirements.data
    });
  } catch (err) {
    console.log(err);
  }
}

function* createNewCohort(action) {
  try {
    yield dispatch({
      type: COHORT_ACTIONS.UNSET_COHORT_CREATION_CONFIRMATION
    });
    yield call(axios.post, "api/cohorts/addNewCohort", action.payload);

    yield dispatch({
      type: COHORT_ACTIONS.SET_COHORT_CREATION_CONFIRMATION
    });
  } catch (error) {
    console.log(error);
  }
}

function* createStateLevelOrg(action) {
  try {
    yield dispatch({
      type: COHORT_ACTIONS.UNSET_SLO_CREATION_CONFIRMATION
    });
    yield call(axios.post, "api/cohorts/addNewSLO", action.payload);

    yield dispatch({
      type: COHORT_ACTIONS.SET_SLO_CREATION_CONFIRMATION
    });
  } catch (error) {
    console.log(error);
  }
}

function* getLatestCohort(action) {
  try {
    yield dispatch({
      type: COHORT_ACTIONS.UNSET_LATEST_COHORT
    });
    let latestCohort = yield call(
      axios.get,
      `api/cohorts/latestCohort/${action.payload}`
    );

    yield dispatch({
      type: COHORT_ACTIONS.SET_LATEST_COHORT,
      payload: latestCohort.data
    });
  } catch (error) {
    console.log(error);
  }
}

function* getCohortSingle(action) {
  try {
    yield dispatch({
      type: COHORT_ACTIONS.UNSET_COHORT_SINGLE
    });

    let cohort = yield call(
      axios.get,
      `api/cohorts/cohortById/${action.payload.cohort_id}`
    );

    yield dispatch({
      type: COHORT_ACTIONS.SET_COHORT_SINGLE,
      payload: [cohort.data]
    });
  } catch (error) {
    console.log(error);
  }
}

function* updateCohort(action) {
  try {
    yield dispatch({
      type : COHORT_ACTIONS.UNSET_COHORT_UPDATE_CONFIRMATION
    })

    yield call(axios.put , `api/cohorts/updateById/${action.payload.cohort_id}` , action.payload.cohort_info);


    yield dispatch({
      type : COHORT_ACTIONS.FETCH_COHORT_SINGLE,
      payload : { cohort_id : action.payload.cohort_id}
    })


    yield dispatch({
      type : COHORT_ACTIONS.SET_COHORT_UPDATE_CONFIRMATION
    })


  } catch (error) {
    console.log(error);
    
    
  }
}

function* cohortSaga() {
  yield takeEvery(COHORT_ACTIONS.FETCH_COHORTS, getCohorts);
  yield takeLatest(COHORT_ACTIONS.ADD_NEW_COHORT, createNewCohort);
  yield takeLatest(COHORT_ACTIONS.FETCH_REQUIREMENTS, getRequirements);
  yield takeEvery(COHORT_ACTIONS.FETCH_STATES, getStates);
  yield takeEvery(COHORT_ACTIONS.FETCH_FILTER_STATE, filterState);
  yield takeEvery(
    COHORT_ACTIONS.FETCH_STATE_LEVEL_ORG,
    getStateLevelOrgandState
  );
  yield takeEvery(COHORT_ACTIONS.FETCH_FILTER_SLO, filterSLO);
  yield takeLatest(COHORT_ACTIONS.ADD_SLO, createStateLevelOrg);
  yield takeLatest(COHORT_ACTIONS.FETCH_LATEST_COHORT, getLatestCohort);
  yield takeLatest(COHORT_ACTIONS.FETCH_COHORT_SINGLE, getCohortSingle);
  yield takeLatest(COHORT_ACTIONS.UPDATE_COHORT, updateCohort);
}

export default cohortSaga;
