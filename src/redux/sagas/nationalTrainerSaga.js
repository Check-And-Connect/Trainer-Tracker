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
    yield dispatch({
      type : NATIONAL_TRAINER_ACTIONS.UNSET_NATIONAL_TRAINERS
    })
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

function* addNewTrainer(action) {
  
  try {
    
    yield call(axios.post, "api/nationalTrainers/addNew", action.payload);

    yield dispatch({
      type : NATIONAL_TRAINER_ACTIONS.FETCH_ALL_NATIONAL_TRAINERS
    })

  } catch (error) {
    console.log(error);
  }
}

function* changeStatus(action) {
  try {
    yield call(axios.post, `api/nationalTrainers/changeStatus/${action.payload.id}`);
    console.log(action);
    
    yield dispatch({
      type : NATIONAL_TRAINER_ACTIONS.FETCH_ALL_NATIONAL_TRAINERS
    })
  } catch (error) {
    console.log(error);  
  }  
}

function* confirmEmail(action) {
  try {
    yield dispatch({
      type : NATIONAL_TRAINER_ACTIONS.UNSET_EMAIL
    })

    let email = yield call(axios.get, `api/nationalTrainers/confirmEmail/${action.payload}`);

    yield dispatch({
      type : NATIONAL_TRAINER_ACTIONS.SET_EMAIL,
      payload : email.data
    })
  } catch (error) {
    console.log(error);
  }
}

function* requestPasswordReset(action) {
  try {
    yield call(axios.post, `api/nationalTrainers/requestPasswordReset`, action.payload)

    
  } catch (error) {
    console.log(error);
    
  }
  
}

function* resetPassword(action) {
  try {
    yield dispatch({
      type : NATIONAL_TRAINER_ACTIONS.UNSET_COFIRM_PASSWORD_RESET
    })

    let confrim = yield call(axios.put, `api/nationalTrainers/resetPassword` , action.payload)

    yield dispatch({
      type : NATIONAL_TRAINER_ACTIONS.CONFIRM_PASSWORD_RESET,
      payload : confrim.data
    })
  } catch (error) {
    console.log(error);
  }
  
}

function* nationalTrainersSaga() {
  yield takeLatest(
    NATIONAL_TRAINER_ACTIONS.FETCH_ALL_NATIONAL_TRAINERS,
    getAllNationalTrainers
  );
  yield takeLatest(
    NATIONAL_TRAINER_ACTIONS.ADD_NATIONAL_TRAINER, addNewTrainer
  )
  yield takeLatest(
    NATIONAL_TRAINER_ACTIONS.CHANGE_STATUS, changeStatus
  )
  yield takeLatest(
    NATIONAL_TRAINER_ACTIONS.CONFIRM_EMAIL , confirmEmail
  )
  yield takeLatest(
    NATIONAL_TRAINER_ACTIONS.REQUEST_PASSWORD_RESET, requestPasswordReset
  )
  yield takeLatest(
    NATIONAL_TRAINER_ACTIONS.RESET_PASSWORD, resetPassword
  )
}

export default nationalTrainersSaga;
