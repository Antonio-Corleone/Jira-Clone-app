import { call, delay, takeLatest, put } from 'redux-saga/effects';
import { jiraService } from '../../services';
import { DELETE_PROJECT_SAGA } from '../constants';
import { actShowLoading, actHideLoading } from '../actions/actLoading';
import { actGetListProjectSaga } from '../actions/actGetListProject';
import { notiFunction } from '../../utils/notification';


function* deleteProject(action) {
  // Call api
  yield put(actShowLoading());
  yield delay(500)
  try {
    const { data, status } = yield call(() => jiraService.deleteProject(action.payload));
    yield put(actGetListProjectSaga());
    notiFunction('success','Delete project successfully!')

  }
  catch (err) {
    console.log(err.response.data);
    notiFunction('error','Delete project fail!')
  }

  yield put(actHideLoading());
}


export function* DeleteProjectRequest() {
  yield takeLatest(DELETE_PROJECT_SAGA, deleteProject)
}