import { takeEvery, takeLatest, call, put as dispatch } from 'redux-saga/effects';
import axios from '../../../node_modules/axios';
import {LOCAL_TRAINERS_ACTIONS} from '../actions/localTrainerActions';
import { callAllLocalTrainers } from '../requests/localTrainerRequests';

function* addNewLT(action){
    try{
      yield call(axios.post, '/api/localTrainers/addLT', action.payload);
    //   yield dispatch({
    //     type: 'GET_DATA'
    //   })
    } catch (error) {
      console.log(error);
    }
  }

function* fetchLocalTrainers() {
    try {
        let allTrainers = yield callAllLocalTrainers();
        console.log(allTrainers);
        
        yield dispatch({
            type : LOCAL_TRAINERS_ACTIONS.SET_LOCAL_TRAINERS,
            payload : allTrainers
        })
        
    } catch (error) {
        console.log(error);  
    }
}

function* addSaga() {
    yield takeEvery('ADD_LT', addNewLT);
    yield takeLatest(LOCAL_TRAINERS_ACTIONS.FETCH_LOCAL_TRAINERS, fetchLocalTrainers);
}

export default addSaga;