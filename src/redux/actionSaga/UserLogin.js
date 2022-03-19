import axios from 'axios';
import { call, delay, fork, take, takeEvery, takeLatest, put } from 'redux-saga/effects';
import { jiraService } from '../../services';
import { history } from '../../utils/history';
import { USER_SIGNIN_SAGA } from '../constants';
import { actShowLoading, actHideLoading } from '../actions/actLoading'
function* signInSaga(action) {
  console.log(action);

  yield put(actShowLoading());
  yield delay(500)

  //Call api
  try {
    const { data, status } = yield call(() => jiraService.signInService(action.userLogin));
    localStorage.setItem('JiraLogin', JSON.stringify(data.content))
    // console.log(data);
    history.push('/home')
  }
  catch (err) { console.log(err.response.data); }
  yield put(actHideLoading());
}

export function* signInRequest() {
  yield takeLatest(USER_SIGNIN_SAGA, signInSaga)
}