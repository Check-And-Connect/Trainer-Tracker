import { takeEvery, takeLatest, call, put as dispatch } from 'redux-saga/effects';
import axios from '../../../node_modules/axios';

function* getCohorts() {
    try {
        const cohortResponse = yield call(axios.get, '/api/cohorts/cohort')
        yield dispatch({
            type: 'TRAINER_COHORTS',
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
            type: 'STATE_AND_STATE_ORG',
            payload: stateLevelResponse.data
        })
    } catch (err) {
        yield console.log(err);
    }
}

function* cohortSaga() {
    yield takeEvery('FETCH_STATE_LEVEL_ORG', getStateLevelOrgandState);
    yield takeEvery('FETCH_COHORTS', getCohorts);
}

export default cohortSaga;