import { takeEvery, call, put as dispatch } from 'redux-saga/effects';
import axios from '../../../node_modules/axios';

function* getStateLevelOrg() {
    try {
      console.log('getStateLevelOrg saga');
      const stateLevelResponse = yield call(axios.get, '/api/trainer')
      yield dispatch({
        type: 'STATE_AND_STATE_ORG',
        payload: stateLevelResponse.data
      })
    } catch (err) {
      yield console.log(err);
    }
  }

function* addSaga() {
    yield takeEvery('FETCH_STATE_LEVEL_ORG', getStateLevelOrg);
    // yield takeEvery();
  }

export default addSaga;