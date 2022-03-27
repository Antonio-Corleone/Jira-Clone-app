import { call, delay, fork, take, takeEvery, takeLatest, put } from 'redux-saga/effects';
import { jiraService } from '../../services';
import { GET_LIST_PROJECT_SAGA } from '../constants';
import { actGetListProject } from '../actions/actGetListProject'

export function* getProjectList(action) {
  // Call api
  try {
    const { data, status } = yield call(() => jiraService.getListProject())
    yield put(actGetListProject(data.content))
  }
  catch (error) {
    console.log(error.response.data);
  }
}

export function* getListProjectRequest() {
  yield takeLatest(GET_LIST_PROJECT_SAGA, getProjectList)
}