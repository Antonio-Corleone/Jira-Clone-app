import { call, delay, takeLatest, put } from 'redux-saga/effects';
import { jiraService } from '../../services';

import {
  CREATE_PROJECT_SAGA,
  DELETE_PROJECT_SAGA,
  EDIT_PROJECT_SAGA,
  GET_LIST_PROJECT_SAGA,
  GET_PROJECT_CATEGORY_SAGA,
  GET_PROJECT_DETAIL_SAGA
} from '../constants';

import { actShowLoading, actHideLoading } from '../actions/actLoading';
import { actCloseModal } from '../actions/actModalPopUp'
import { actGetListProjectSaga, actGetListProject, actGetProjectCategory, actGetProjectDetail } from '../actions/actProject';

import { notiFunction } from '../../utils/notification';
import { history } from '../../utils/history'

// Create project Saga
function* createProject(action) {
  // Call api
  yield put(actShowLoading());
  yield delay(500)
  try {
    yield call(() => jiraService.createProject(action.payload));
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
// Delete project Saga
function* deleteProject(action) {
  // Call api
  yield put(actShowLoading());
  yield delay(500)
  try {
    yield call(() => jiraService.deleteProject(action.payload));
    yield put(actGetListProjectSaga());
    notiFunction('success', 'Delete project successfully!')

  }
  catch (err) {
    console.log(err.response.data);
    notiFunction('error', 'Delete project fail!')
  }

  yield put(actHideLoading());
}


export function* DeleteProjectRequest() {
  yield takeLatest(DELETE_PROJECT_SAGA, deleteProject)
}
// Edit project Saga
function* editProject(action) {
  // Call api
  yield put(actShowLoading());
  yield delay(500)
  try {
    yield call(() => jiraService.editProject(action.payload));
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

// Get list project Saga
export function* getProjectList(action) {
  // Call api
  try {
    const { data } = yield call(() => jiraService.getListProject())
    yield put(actGetListProject(data.content))
  }
  catch (error) {
    console.log(error.response.data);
  }
}

export function* GetListProjectRequest() {
  yield takeLatest(GET_LIST_PROJECT_SAGA, getProjectList)
}
// Get project category
function* getProjectCategory(action) {
  // Call api
  try {
    const { data } = yield call(() => jiraService.getAllProjectCategory());
    yield put(actGetProjectCategory(data.content))
  }
  catch (err) {
    console.log(err.response.data);
  }
}


export function* ProjectCategoryRequest() {
  yield takeLatest(GET_PROJECT_CATEGORY_SAGA, getProjectCategory)
}

// Get project detail
function* getProjectId(action) {
  // Call api
  try {
    const { data } = yield call(() => jiraService.getProjectDetail(action.payload));

    yield put(actGetProjectDetail(data.content))
  }
  catch (err) {
    console.log(err.response.data);
  }
}


export function* GetProjectIdRequest() {
  yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectId)
}