import { call, delay, takeLatest, put, select } from 'redux-saga/effects';
import { jiraService } from '../../services';
import { actEditTaskModal, actGetTaskDetail, actGetTaskPriority, actGetTaskStatus, actGetTaskType, actRemoveUserAssignee } from '../actions/actTasks';

import { actShowLoading, actHideLoading } from '../actions/actLoading';
import { history } from '../../utils/history'
import { notiFunction } from '../../utils/notification';
import { actCloseModal } from '../actions/actModalPopUp';

import {
  GET_TASK_TYPE_SAGA,
  GET_TASK_PRIORITY_SAGA,
  CREATE_NEW_TASK_SAGA,
  GET_TASK_STATUS_SAGA,
  GET_TASK_DETAIL_SAGA,
  EDIT_TASK_MODAL_SAGA,
  EDIT_TASK_MODAL,
  REMOVE_USER_ASSIGNEE,
  UPDATE_TASK_STATUS_SAGA
} from '../constants';
import { actGetProjectDetailSaga } from '../actions/actProject';

// Get task types
function* getTaskType(action) {
  // Call api
  try {
    const { data } = yield call(() => jiraService.getTaskType());
    yield put(actGetTaskType(data.content))
  }
  catch (err) {
    console.log(err.response?.data);
  }
}

export function* GetTaskTypeRequest() {
  yield takeLatest(GET_TASK_TYPE_SAGA, getTaskType)
}
// Get task priority
function* getTaskPriority(action) {
  // Call api
  try {
    const { data } = yield call(() => jiraService.getTaskPriority());
    yield put(actGetTaskPriority(data.content))
  }
  catch (err) {
    console.log(err.response?.data);
  }
}

export function* GetTaskPriorityRequest() {
  yield takeLatest(GET_TASK_PRIORITY_SAGA, getTaskPriority)
}
// Get task status
function* getTaskStatus(action) {
  // Call api
  try {
    const { data } = yield call(() => jiraService.getTaskStatus());
    yield put(actGetTaskStatus(data.content))
  }
  catch (err) {
    console.log(err.response?.data);
  }
}

export function* GetTaskStatusRequest() {
  yield takeLatest(GET_TASK_STATUS_SAGA, getTaskStatus)
}


// Create new task
function* createNewTask(action) {

  // Call api
  yield put(actShowLoading());
  yield delay(500)
  try {
    const { data } = yield call(() => jiraService.createNewTaskApi(action.payload));
    yield put(actCloseModal())
    notiFunction('success', 'Create new task successfully!')
    yield delay(500)
    yield put(actGetProjectDetailSaga(action.payload.projectId))
    history.push(`/project-detail/${action.payload.projectId}`)
  }
  catch (err) {
    console.log(err.response?.data);
    yield put(actCloseModal())
    notiFunction('error', 'Create new task fail!')
  }
  yield put(actHideLoading());
}

export function* CreateNewTaskRequest() {
  yield takeLatest(CREATE_NEW_TASK_SAGA, createNewTask)
}

// Get task details
function* getTaskDetail(action) {
  // Call api
  try {
    const { data } = yield call(() => jiraService.getTaskDetailApi(action.payload));
    yield put(actGetTaskDetail(data.content))

  }
  catch (err) {
    console.log(err.response?.data);
  }
}

export function* GetTaskDetailRequest() {
  yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetail)
}
// Update task
function* updateTaskModal(action) {
  // Call api
  try {
    if (action.actionType === REMOVE_USER_ASSIGNEE) {
      yield put(actRemoveUserAssignee(action.payload))
    } else {
      yield put(actEditTaskModal(action.payload))
    }

    const { taskDetailModal } = yield select(state => state.tasksModalReducer);
    const listUserAsign = taskDetailModal.assigness?.map(item => {
      return item.id
    })
    const updateTask = { ...taskDetailModal, listUserAsign }

    yield call(() => jiraService.editTaskModalApi(updateTask));
    yield put(actGetProjectDetailSaga(taskDetailModal.projectId))

  }
  catch (err) {
    console.log(err.response?.data);
  }
}

export function* UpdateTaskModalRequest() {
  yield takeLatest(EDIT_TASK_MODAL_SAGA, updateTaskModal)
}
// Update task status
function* updateTaskStatus(action) {
  // Call api
  try {
    yield call(() => jiraService.updateTaskStatusApi(action.payload));
    yield put(actGetProjectDetailSaga(action.projectId))
  }
  catch (err) {
    console.log(err.response?.data);
  }
}

export function* UpdateTaskStatusRequest() {
  yield takeLatest(UPDATE_TASK_STATUS_SAGA, updateTaskStatus)
}