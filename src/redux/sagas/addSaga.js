import { takeEvery, call, put as dispatch } from 'redux-saga/effects';
import axios from '../../../node_modules/axios';

function* getStateLevelOrg() {
    try {
        const stateLevelResponse = yield call(axios.get, '/api/trainer')
        yield dispatch({
            type: 'STATE_AND_STATE_ORG',
            payload: stateLevelResponse.data
        })
    } catch (err) {
        yield console.log(err);
    }
}

function* getStateLead() {
    try {
        const stateLeadResponse = yield call(axios.get, '/api/trainer/stateLead')
        yield dispatch({
            type: 'STATE_LEAD',
            payload: stateLeadResponse.data
        })
    } catch (err) {
        yield console.log(err);
    }
}

function* getCohorts() {
    try {
        const cohortResponse = yield call(axios.get, '/api/trainer/cohort')
        yield dispatch({
            type: 'TRAINER_COHORTS',
            payload: cohortResponse.data
        })
    } catch (err) {
        yield console.log(err);
    }
}

function* addSaga() {
    yield takeEvery('FETCH_STATE_LEVEL_ORG', getStateLevelOrg);
    yield takeEvery('FETCH_STATE_LEAD', getStateLead);
    yield takeEvery('FETCH_COHORTS', getCohorts);
}

export default addSaga;