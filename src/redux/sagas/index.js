import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import localTrainerSaga from './localTrainersSaga';

export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    // watchIncrementAsync(),
    localTrainerSaga()
  ]);
}
