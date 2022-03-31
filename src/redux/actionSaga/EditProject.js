import { call, delay, fork, take, takeEvery, takeLatest, put } from 'redux-saga/effects';
import { jiraService } from '../../services';
import { EDIT_PROJECT_SAGA } from '../constants';
import { actShowLoading, actHideLoading } from '../actions/actLoading';
import { actGetListProjectSaga } from '../actions/actGetListProject';
import { actCloseModal } from '../actions/actModalPopUp'

function* editProject(action) {
  // Call api
  yield put(actShowLoading());
  yield delay(500)
  try {
    const { data, status } = yield call(() => jiraService.editProject(action.payload));
    yield put(actGetListProjectSaga());
    yield put(actCloseModal())

  }
  catch (err) {
    console.log(err.response.data);
  }

  yield put(actHideLoading());
}


export function* UpdateProjectRequest() {
  yield takeLatest(EDIT_PROJECT_SAGA, editProject)
}