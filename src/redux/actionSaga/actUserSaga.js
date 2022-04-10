import { call, delay, takeLatest, put } from 'redux-saga/effects';
import { jiraService } from '../../services';
import { history } from '../../utils/history';

import {
  USER_SIGNIN_SAGA,
  GET_USER_INFO_SAGA,
  ADD_USER_PROJECT_SAGA,
  DELETE_USER_PROJECT_SAGA,
  GET_USER_BY_PROJECT_SAGA
} from '../constants';
import { actGetUserApi, actGetUserByProjectId } from '../actions/actUser'
import { actShowLoading, actHideLoading } from '../actions/actLoading'
import { actGetListProjectSaga } from '../actions/actProject';

// User Login
function* signInSaga(action) {

  yield put(actShowLoading());
  yield delay(500)

  //Call api
  try {
    const { data } = yield call(() => jiraService.signInService(action.userLogin));
    localStorage.setItem('JiraLogin', JSON.stringify(data.content))
    // console.log(data);
    history.push('/')
  }
  catch (err) { console.log(err.response?.data); }
  yield put(actHideLoading());
}

export function* SignInRequest() {
  yield takeLatest(USER_SIGNIN_SAGA, signInSaga)
}

// Get User Api
function* getUserApi(action) {
  // Call api

  try {
    const { data } = yield call(() => jiraService.getUserInfo(action.payload));
    // console.log(data);
    yield put(actGetUserApi(data.content))
  }
  catch (err) {
    console.log(err.response?.data);
  }
}


export function* GetUserRequest() {
  yield takeLatest(GET_USER_INFO_SAGA, getUserApi)
}

// Add user to project
function* addMemberProject(action) {
  // Call api
  yield put(actShowLoading());
  yield delay(500)
  try {
    yield call(() => jiraService.addMemberProject(action.payload));
    yield put(actGetListProjectSaga());
  }
  catch (err) {
    console.log(err.response?.data);
  }
  yield put(actHideLoading());
}


export function* AddMemberRequest() {
  yield takeLatest(ADD_USER_PROJECT_SAGA, addMemberProject)
}
// Remove user from project
function* deleteMemberProject(action) {
  // Call api
  yield put(actShowLoading());
  yield delay(500)
  try {
    yield call(() => jiraService.deleteMemberProject(action.payload));
    yield put(actGetListProjectSaga());
  }
  catch (err) {
    console.log(err.response?.data);
  }
  yield put(actHideLoading());
}


export function* RemoveMemberRequest() {
  yield takeLatest(DELETE_USER_PROJECT_SAGA, deleteMemberProject)
}

// Get user from project id
function* getUserProject(action) {
  // Call api
  try {
    const { data, status } = yield call(() => jiraService.getUserByProjectId(action.payload));
    // console.log(data);
    if (status === 200) {
      yield put(actGetUserByProjectId(data.content));
    }

  }
  catch (err) {
    yield put(actGetUserByProjectId([]));
  }
}


export function* getUserProjectRequest() {
  yield takeLatest(GET_USER_BY_PROJECT_SAGA, getUserProject)
}