import { call, delay, takeLatest, put } from 'redux-saga/effects';
import { jiraService } from '../../services';
import { ADD_USER_PROJECT_SAGA } from '../constants';
import { actShowLoading, actHideLoading } from '../actions/actLoading';
import { actGetListProjectSaga } from '../actions/actGetListProject';


function* addMemberProject(action) {
  // Call api
  yield put(actShowLoading());
  yield delay(500)
  try {
    const { data, status } = yield call(() => jiraService.addMemberProject(action.payload));
    yield put(actGetListProjectSaga());
  }
  catch (err) {
    console.log(err.response.data);
  }
  yield put(actHideLoading());
}


export function* addMemberRequest() {
  yield takeLatest(ADD_USER_PROJECT_SAGA, addMemberProject)
}