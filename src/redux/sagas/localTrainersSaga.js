import { put as dispatch, takeLatest } from 'redux-saga/effects';
import {LOCAL_TRAINERS_ACTIONS} from '../actions/localTrainersAction';
import { callAllLocalTrainers } from '../requests/localTrainersRequests';



function* fetchLocalTrainers() {
    try {
        let allTrainers = yield callAllLocalTrainers();
        yield dispatch({
            type : LOCAL_TRAINERS_ACTIONS.SET_LOCAL_TRAINERS,
            payload : allTrainers
        })
        
    } catch (error) {
        console.log(error);  
    }
}

function* localTrainerSaga () {
    yield takeLatest(LOCAL_TRAINERS_ACTIONS.FETCH_LOCAL_TRAINERS, fetchLocalTrainers);

}

export default localTrainerSaga;