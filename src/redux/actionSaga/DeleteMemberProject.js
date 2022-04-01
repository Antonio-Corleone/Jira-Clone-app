import { call, delay, takeLatest, put } from 'redux-saga/effects';
import { jiraService } from '../../services';
import { DELETE_USER_PROJECT_SAGA } from '../constants';
import { actShowLoading, actHideLoading } from '../actions/actLoading';
import { actGetListProjectSaga } from '../actions/actGetListProject';


function* deleteMemberProject(action) {
  // Call api
  yield put(actShowLoading());
  yield delay(500)
  try {
    const { data, status } = yield call(() => jiraService.deleteMemberProject(action.payload));
    yield put(actGetListProjectSaga());
  }
  catch (err) {
    console.log(err.response.data);
  }
  yield put(actHideLoading());
}


export function* deleteMemberRequest() {
  yield takeLatest(DELETE_USER_PROJECT_SAGA, deleteMemberProject)
}