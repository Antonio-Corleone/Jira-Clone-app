import { call, delay, takeLatest, put } from 'redux-saga/effects';
import { jiraService } from '../../services';
import { GET_USER_INFO_SAGA } from '../constants';
import { actGetUserApi } from '../actions/actGetUser'


function* getUserApi(action) {
  // Call api

  try {
    const { data, status } = yield call(() => jiraService.getUserInfo(action.payload));
    // console.log(data);
    yield put(actGetUserApi(data.content))
  }
  catch (err) {
    console.log(err.response.data);
  }
}


export function* GetUserRequest() {
  yield takeLatest(GET_USER_INFO_SAGA, getUserApi)
}