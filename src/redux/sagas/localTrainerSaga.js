import {
  takeEvery,
  takeLatest,
  all,
  call,
  put as dispatch
} from "redux-saga/effects";
import axios from "../../../node_modules/axios";
import moment from 'moment';
import { LOCAL_TRAINERS_ACTIONS } from "../actions/localTrainerActions";

function* addNewLT(action) {
  try {
    yield call(axios.post, "/api/localTrainers/addLT", action.payload);  
  } catch (error) {
    console.log(error);
    yield dispatch({
      type: LOCAL_TRAINERS_ACTIONS.SHOW_RECENT_ADD,
      payload: error
    });
  }
}

function* fetchLocalTrainers() {
  try {
    yield dispatch({
      type: LOCAL_TRAINERS_ACTIONS.UNSET_LOCAL_TRAINERS
    });
    let allTrainers = yield call(axios.get, "/api/localTrainers/");

    // We are attaching the upcoming and previous reqs to the trainer objects here
    // so that by the time the array is set on the redux state, those properties will
    // be available. 
    allTrainers.data.forEach(trainer => {
      trainer.lastNext = getLastNext(trainer.requirements)
    })

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
      }&requirementId=${action.payload.requirementId}&cycle=${action.payload.cycle}`
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
    yield dispatch({
      type: LOCAL_TRAINERS_ACTIONS.UNSET_CONFIRM_COMPLETION
    });
    yield dispatch({
      type: LOCAL_TRAINERS_ACTIONS.UNSET_TRAINER_REQUIREMENT_SINGLE
    });
    let actualPayload = {
      requirement_id: action.payload.requirement_id,
      date_marked_complete: action.payload.date_marked_complete,
      national_trainer: action.payload.national_trainer,
      note: action.payload.note,
      lc_req_id : action.payload.lc_req_id
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

    console.log(action.payload);

    yield dispatch({
      type: LOCAL_TRAINERS_ACTIONS.FETCH_TRAINER_REQUIREMENT_SINGLE,
      payload: {
        requirementId: action.payload.requirement_id,
        localTrainerId: action.payload.localTrainerIDs[0],
        cycle : action.payload.cycle
      }
    });

    yield dispatch({
      type: LOCAL_TRAINERS_ACTIONS.FETCH_LOCAL_TRAINERS
    });

    yield dispatch({
      type: LOCAL_TRAINERS_ACTIONS.SET_CONFIRM_COMPLETION
    });
  } catch (error) {
    console.log(error);
  }
}

function* scheduleForRequirement(action) {
  try {
    yield dispatch({
      type: LOCAL_TRAINERS_ACTIONS.UNSET_CONFRIM_SCHEDULE_CREATED
    });

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

    yield dispatch({
      type: LOCAL_TRAINERS_ACTIONS.FETCH_LOCAL_TRAINERS
    });

    yield dispatch({
      type: LOCAL_TRAINERS_ACTIONS.SET_CONFIRM_SCHEDULE_CREATED
    });
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
  yield takeLatest(
    LOCAL_TRAINERS_ACTIONS.SCHEDULE_FOR_REQUIREMENT,
    scheduleForRequirement
  );
}

function getLastNext(requirementsArray) {

  let lastNext = ['n/a', 'n/a', 'n/a'];
  if (!requirementsArray || requirementsArray.length === 0){
      return lastNext;
  }

  requirementsArray.sort((a, b) => {
      return a.requirement_id - b.requirement_id
  })
  for (let i = 0; i < requirementsArray.length; i++) {
      if (requirementsArray[i].completed === null) {
          lastNext[1] = requirementsArray[i].requirement_name;
          lastNext[2] = moment(requirementsArray[i].requirement_due_date).format("MM-DD-YYYY");
          if (i === 0) {
              lastNext[0] = 'n/a';
              return lastNext
          } else {
              lastNext[0] = requirementsArray[i - 1].requirement_name;
              return lastNext;
          }
      }
  }
}

export default addSaga;
