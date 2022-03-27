import { call, delay, fork, take, takeEvery, takeLatest, put } from 'redux-saga/effects';
import { jiraService } from '../../services';
import { CREATE_PROJECT_SAGA } from '../constants';
import { actCreateProject } from '../actions/actCreateProject'
function* createProject(action) {
  // Call api
  try {
    const { data, status } = yield call(() => jiraService.createProject(action.payload));
    console.log(data);
  }
  catch (err) {
    console.log(err.response.data);
  }
}


export function* CreateProjectRequest() {
  yield takeLatest(CREATE_PROJECT_SAGA, createProject)
}