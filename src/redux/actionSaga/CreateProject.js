import { call, delay, takeLatest, put } from 'redux-saga/effects';
import { jiraService } from '../../services';
import { CREATE_PROJECT_SAGA } from '../constants';
import { actShowLoading, actHideLoading } from '../actions/actLoading';
import { history } from '../../utils/history'


function* createProject(action) {
  // Call api
  yield put(actShowLoading());
  yield delay(500)
  try {
    const { data, status } = yield call(() => jiraService.createProject(action.payload));
    history.push('/project-management')
  }
  catch (err) {
    console.log(err.response.data);
  }
  yield put(actHideLoading());
}


export function* CreateProjectRequest() {
  yield takeLatest(CREATE_PROJECT_SAGA, createProject)
}