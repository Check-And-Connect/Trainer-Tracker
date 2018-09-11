import { takeEvery, takeLatest,  call, put as dispatch } from 'redux-saga/effects';
import axios from '../../../node_modules/axios';

import { COHORT_ACTIONS } from '../actions/cohortActions';

// get all cohorts from database
function* getCohorts() {
    try {
        const cohortResponse = yield call(axios.get, '/api/cohorts/cohort')
        yield dispatch({
            type: COHORT_ACTIONS.TRAINER_COHORTS,
            payload: cohortResponse.data
        })
    } catch (err) {
        console.log(err);
    }
}

// get only states from database
function* getStates() {
    try {
        const stateResponse = yield call(axios.get, '/api/cohorts/states')
        yield dispatch({
            type: COHORT_ACTIONS.STATE_LIST,
            payload: stateResponse.data
        })
    } catch (err) {
        console.log(err);
    }
}

function* filterSLO(action) {
    try {
        const cohortResponse = yield call(axios.get, '/api/cohorts/cohort')
        yield dispatch({
            type: COHORT_ACTIONS.TRAINER_COHORTS,
            payload: cohortResponse.data
        })
        yield dispatch({
            type: COHORT_ACTIONS.FILTER_SLO,
            payload: action.payload
        })
    } catch (err) {
         console.log(err);
    }
}

// filter state level orgs and states
function* filterState(action) {
    try {
        const stateLevelResponse = yield call(axios.get, '/api/cohorts/stateLevelOrganization')
        yield dispatch({
            type: COHORT_ACTIONS.STATE_AND_STATE_ORG,
            payload: stateLevelResponse.data
        })
        yield dispatch({
            type: COHORT_ACTIONS.FILTER_STATE,
            payload: action.payload
        })
    } catch (err) {
         console.log(err);
    }
}

function* getStateLevelOrgandState() {
    try {
        const stateLevelResponse = yield call(axios.get, '/api/cohorts/stateLevelOrganization')
        yield dispatch({
            type: COHORT_ACTIONS.STATE_AND_STATE_ORG,
            payload: stateLevelResponse.data
        })
    } catch (err) {
         console.log(err);
    }
}

function* getRequirements() {
    try {
        const requirements = yield call(axios.get, '/api/cohorts/requirements')
        console.log(requirements);
        
        yield dispatch({
            type : COHORT_ACTIONS.SET_REQUIREMENTS,
            payload : requirements.data
        })
    } catch(err) {
        console.log(err);
        
    }
    
}

function* cohortSaga() {
    yield takeEvery(COHORT_ACTIONS.FETCH_COHORTS, getCohorts);
    yield takeLatest(COHORT_ACTIONS.FETCH_REQUIREMENTS, getRequirements)
    yield takeEvery(COHORT_ACTIONS.FETCH_STATES, getStates);
    yield takeEvery(COHORT_ACTIONS.FETCH_FILTER_STATE, filterState);
    yield takeEvery(COHORT_ACTIONS.FETCH_STATE_LEVEL_ORG, getStateLevelOrgandState);
    yield takeEvery(COHORT_ACTIONS.FETCH_FILTER_SLO, filterSLO);
    
}

export default cohortSaga;
