import { takeEvery, call, put as dispatch } from 'redux-saga/effects';
import axios from '../../../node_modules/axios';
import {STATE_LEAD_ACTIONS} from '../actions/stateLeadActions';


function* getStateLead() {
    try {
        const stateLeadResponse = yield call(axios.get, '/api/stateLeads/stateLead')
        yield dispatch({
            type: STATE_LEAD_ACTIONS.STATE_LEAD,
            payload: stateLeadResponse.data
        })
    } catch (err) {
        yield console.log(err);
    }
}

function* getStateLeadDropDown(action) {
    try {
        const stateLeadResponse = yield call(axios.get, '/api/stateLeads/stateLead')
        yield dispatch({
            type: STATE_LEAD_ACTIONS.STATE_LEAD,
            payload: stateLeadResponse.data
        })
        yield dispatch({
            type: STATE_LEAD_ACTIONS.FILTER_STATE_LEAD,
            payload: action.payload
        })
    } catch (err) {
        yield console.log(err);
    }
}

function* stateLeadSaga() {
    yield takeEvery(STATE_LEAD_ACTIONS.FETCH_STATE_LEAD, getStateLead);
    yield takeEvery(STATE_LEAD_ACTIONS.FETCH_STATE_LEAD_DROPDOWN, getStateLeadDropDown);
}

export default stateLeadSaga;