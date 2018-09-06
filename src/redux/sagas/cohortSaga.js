import { takeEvery, takeLatest, call, put as dispatch } from 'redux-saga/effects';
import axios from '../../../node_modules/axios';
import {COHORT_ACTIONS} from '../actions/cohortActions';

function* getCohorts() {
    try {
        const cohortResponse = yield call(axios.get, '/api/cohorts/cohort')
        yield dispatch({
            type: COHORT_ACTIONS.TRAINER_COHORTS,
            payload: cohortResponse.data
        })
    } catch (err) {
        yield console.log(err);
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
        yield console.log(err);
    }
}

function* cohortSaga() {
    yield takeEvery(COHORT_ACTIONS.FETCH_STATE_LEVEL_ORG, getStateLevelOrgandState);
    yield takeEvery(COHORT_ACTIONS.FETCH_COHORTS, getCohorts);
}

export default cohortSaga;