import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import addSaga from './addSaga';


export default function* rootSaga() {
  
  yield all([
    userSaga(),
    loginSaga(),
    addSaga()
    // watchIncrementAsync()
  ]);
}
