import { takeEvery, takeLatest, call, put as dispatch } from 'redux-saga/effects';
import axios from '../../../node_modules/axios';
import { COHORT_ACTIONS } from '../actions/cohortActions';





function* getAllSLOs() {

    try {
        let allCLOs = yield call(axios.get, '/api/cohort/');

        yield dispatch({
            type : COHORT_ACTIONS.SET_ALL_COHORTS,
            payload : allCLOs
        })
    } catch (error) {
        console.log(error);
    }
    
}


function* cohortSaga() {
    yield takeLatest(COHORT_ACTIONS.FETCH_SLOS, getAllSLOs);
}

export default cohortSaga;