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

//get national trainer details
function* getOneNationalTrainer() {
  try {
    let NTDetails = yield call(axios.get, "/api/nationalTrainers/getNTDetails");
    console.log(NTDetails);
    yield dispatch({
      type: NATIONAL_TRAINER_ACTIONS.SET_ONE_NATIONAL_TRAINER,
      payload: NTDetails.data
    });
  } catch (error) {
    console.log(error);
  }
}

//update national trainer details
function* updateOneNationalTrainer(action) {
  try {
    yield call(axios.put, `api/nationalTrainers/updateNT/`, action.payload);
  } catch (err) {
    yield console.log(err);
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
  );
  yield takeLatest(
    NATIONAL_TRAINER_ACTIONS.CHANGE_STATUS, changeStatus
  );
  yield takeLatest(
    NATIONAL_TRAINER_ACTIONS.FETCH_ONE_NATIONAL_TRAINER, getOneNationalTrainer
  );
  yield takeLatest(
    NATIONAL_TRAINER_ACTIONS.UPDATE_NATIONAL_TRAINER, updateOneNationalTrainer
  );
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
