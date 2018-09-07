
import {
  takeEvery,
  takeLatest,
  call,
  put as dispatch
} from "redux-saga/effects";
import axios from "../../../node_modules/axios";
import { LOCAL_TRAINERS_ACTIONS } from "../actions/localTrainerActions";




function* addNewLT(action){
    try{
      yield call(axios.post, '/api/localTrainers/addLT', action.payload);
    } catch (error) {
      console.log(error);
    }
  }


function* fetchLocalTrainers() {
  try {
    let allTrainers = yield call(axios.get, "/api/localTrainers/");

    console.log(allTrainers);

    yield dispatch({
      type: LOCAL_TRAINERS_ACTIONS.SET_LOCAL_TRAINERS,
      payload: allTrainers.data
    });
  } catch (error) {
    console.log(error);
  }
}

function* fetchLocalTrainerDetails(action) {
  try {
    console.log('fetching details for trainer', action.payload);
    let trainerID = action.payload;
    const trainerDetails = yield call(
      axios.get, `/api/localTrainers/${trainerID}`
    )
    
    yield dispatch({
      type: LOCAL_TRAINERS_ACTIONS.SET_LOCAL_TRAINER_DETAILS,
      payload: trainerDetails.data
    })


  } catch (err){
    console.log(err);
    yield(err);
  }
}

function* fetchRequirementForLocalTrainer(action) {
  try {
    let trainerInfo = yield call(
      axios.get,
      `/api/localTrainers/?localTrainerId=${
        action.payload.localTrainerId
      }&requirementId=${action.payload.requirementId}`
    );

    yield dispatch({
        type : LOCAL_TRAINERS_ACTIONS.SET_TRAINER_REQUIREMENT_SINGLE,
        payload : trainerInfo.data
    })
    console.log(trainerInfo);
    
  } catch (error) {
    console.log(error);
  }
}

function* addSaga() {

    yield takeEvery(LOCAL_TRAINERS_ACTIONS.ADD_LT, addNewLT);
    yield takeLatest(LOCAL_TRAINERS_ACTIONS.FETCH_LOCAL_TRAINERS, fetchLocalTrainers);
    yield takeLatest(LOCAL_TRAINERS_ACTIONS.FETCH_LOCAL_TRAINER_DETAILS, fetchLocalTrainerDetails);

  yield takeLatest(
    LOCAL_TRAINERS_ACTIONS.FETCH_TRAINER_REQUIREMENT_SINGLE,
    fetchRequirementForLocalTrainer
  );

}

export default addSaga;
