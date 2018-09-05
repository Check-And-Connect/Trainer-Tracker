import { takeEvery, takeLatest, call, put as dispatch } from 'redux-saga/effects';
import axios from '../../../node_modules/axios';

function* getStateLead() {
    try {
        const stateLeadResponse = yield call(axios.get, '/api/stateLeads/stateLead')
        yield dispatch({
            type: 'STATE_LEAD',
            payload: stateLeadResponse.data
        })
    } catch (err) {
        yield console.log(err);
    }
}

function* stateLeadSaga() {
    yield takeEvery('FETCH_STATE_LEAD', getStateLead);
}

export default stateLeadSaga;