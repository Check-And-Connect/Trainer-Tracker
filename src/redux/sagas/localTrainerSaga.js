import {
  takeEvery,
  takeLatest,
  all,
  call,
  put as dispatch
} from "redux-saga/effects";
import axios from "../../../node_modules/axios";
import { LOCAL_TRAINERS_ACTIONS } from "../actions/localTrainerActions";

function* addNewLT(action) {
  try {
    yield call(axios.post, "/api/localTrainers/addLT", action.payload);
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

function* fetchRequirementForLocalTrainer(action) {
  try {
    let trainerInfo = yield call(
      axios.get,
      `/api/localTrainers/?localTrainerId=${
        action.payload.localTrainerId
      }&requirementId=${action.payload.requirementId}`
    );

    yield dispatch({
      type: LOCAL_TRAINERS_ACTIONS.SET_TRAINER_REQUIREMENT_SINGLE,
      payload: trainerInfo.data
    });
    console.log(trainerInfo);
  } catch (error) {
    console.log(error);
  }
}

function* markComplete(action) {
  try {
    let actualPayload = {
      requirement_id: action.payload.requirement_id,
      date_marked_complete: action.payload.date_marked_complete
    };

    yield all(
      action.payload.localTrainerIDs.map(id =>
        call(
          axios.post,
          `/api/localTrainers/markRequirememtComplete/${id}`,
          actualPayload
        )
      )
    );
  } catch (error) {
    console.log(error);
  }
}

function* scheduleForRequirement(action) {
  try {
    let actualPayload = {
      requirement_id: action.payload.requirement_id,
      date_scheduled: action.payload.date_scheduled
    };

    yield all(
      action.payload.localTrainerIDs.map(id =>
        call(
          axios.post,
          `/api/localTrainers/scheduleForRequirement/${id}`,
          actualPayload
        )
      )
    );
  } catch (error) {
    console.log(error);
  }


}

function* addSaga() {
  yield takeEvery(LOCAL_TRAINERS_ACTIONS.ADD_LT, addNewLT);
  yield takeLatest(
    LOCAL_TRAINERS_ACTIONS.FETCH_LOCAL_TRAINERS,
    fetchLocalTrainers
  );
  yield takeLatest(
    LOCAL_TRAINERS_ACTIONS.FETCH_TRAINER_REQUIREMENT_SINGLE,
    fetchRequirementForLocalTrainer
  );
  yield takeLatest(LOCAL_TRAINERS_ACTIONS.MARK_COMPLETE, markComplete);
  yield takeLatest(LOCAL_TRAINERS_ACTIONS.SCHEDULE_FOR_REQUIREMENT, scheduleForRequirement)
}

export default addSaga;
