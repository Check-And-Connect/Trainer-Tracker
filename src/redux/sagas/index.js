import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import localTrainerSaga from './localTrainerSaga';
// import nationalTrainerSaga from './nationalTrainerSaga';
import cohortSaga from './cohortSaga';
import stateLeadSaga from './stateLeadSaga';



export default function* rootSaga() {
  
  yield all([
    userSaga(),
    loginSaga(),
    localTrainerSaga(),
    // nationalTrainerSaga(),
    cohortSaga(),

    stateLeadSaga()

    // watchIncrementAsync()
  ]);
}
