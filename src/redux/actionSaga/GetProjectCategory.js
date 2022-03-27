import { call, delay, fork, take, takeEvery, takeLatest, put } from 'redux-saga/effects';
import { jiraService } from '../../services';
import { GET_PROJECT_CATEGORY_SAGA } from '../constants';
import { actGetProjectCategory } from '../actions/actGetProjectCategory'
function* getProjectCategory(action) {
  // Call api
  try {
    const { data, status } = yield call(() => jiraService.getAllProjectCategory());
    yield put(actGetProjectCategory(data.content))
  }
  catch (err) {
    console.log(err.response.data);
  }
}


export function* projectCategoryRequest() {
  yield takeLatest(GET_PROJECT_CATEGORY_SAGA, getProjectCategory)
}