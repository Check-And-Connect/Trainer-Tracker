import {
  takeEvery,
  takeLatest,
  all,
  call,
  put as dispatch
} from "redux-saga/effects";
import axios from "axios";
import { NATIONAL_TRAINER_ACTIONS } from "../actions/nationalTrainerActions";

function* getAllNationalTrainers() {
  try {
    let allLTs = yield call(axios.get, "api/nationalTrainers/");
    console.log(allLTs);
    yield dispatch({
      type: NATIONAL_TRAINER_ACTIONS.SET_ALL_NATIONAL_TRAINERS,
      payload: allLTs.data
    });
  } catch (error) {
    console.log(error);
  }
}

function* nationalTrainersSaga() {
  yield takeLatest(
    NATIONAL_TRAINER_ACTIONS.FETCH_ALL_NATIONAL_TRAINERS,
    getAllNationalTrainers
  );
}

export default nationalTrainersSaga;
