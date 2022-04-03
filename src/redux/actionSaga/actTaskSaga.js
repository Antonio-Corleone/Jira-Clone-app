import { call, delay, takeLatest, put } from 'redux-saga/effects';
import { jiraService } from '../../services';
import { actGetTaskPriority, actGetTaskType } from '../actions/actTasks';

import {
  GET_TASK_TYPE_SAGA,
  GET_TASK_PRIORITY_SAGA
} from '../constants';


function* getTaskType(action) {
  console.log(action);
  // Call api
  try {
    const { data } = yield call(() => jiraService.getTaskType());
    console.log(data);
    yield put(actGetTaskType(data.content))
  }
  catch (err) {
    console.log(err.response.data);
  }
}


export function* GetTaskTypeRequest() {
  yield takeLatest(GET_TASK_TYPE_SAGA, getTaskType)
}

function* getTaskPriority(action) {
  console.log(action);
  // Call api
  try {
    const { data } = yield call(() => jiraService.getTaskPriority());
    console.log(data);
    yield put(actGetTaskPriority(data.content))
  }
  catch (err) {
    console.log(err.response.data);
  }
}


export function* GetTaskPriorityRequest() {
  yield takeLatest(GET_TASK_PRIORITY_SAGA, getTaskPriority)
}