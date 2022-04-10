import { call, takeLatest, put } from 'redux-saga/effects';
import { notiFunction } from '../../utils/notification';
import { jiraService } from '../../services';
import { DELETE_COMMENT_SAGA, INSERT_COMMENT_SAGA, UPDATE_COMMENT_SAGA } from '../constants';
import { actGetTaskDetailSaga } from '../actions/actTasks';

// Create comment
function* insertComment(action) {
  // Call api
  try {
    yield call(() => jiraService.insertCommentApi(action.payload));
    yield put(actGetTaskDetailSaga(action.payload.taskId))
    notiFunction('success', 'Create new comment successfully!')
  }
  catch (err) {
    console.log(err.response?.data);
  }
}

export function* InsertCommentRequest() {
  yield takeLatest(INSERT_COMMENT_SAGA, insertComment)
}
// Delete comment
function* deleteComment(action) {
  console.log(action);
  // Call api
  try {
    yield call(() => jiraService.deleteCommentApi(action.payload));
    yield put(actGetTaskDetailSaga(action.taskId))
  }
  catch (err) {
    console.log(err.response?.data);
  }
}

export function* DeleteCommentRequest() {
  yield takeLatest(DELETE_COMMENT_SAGA, deleteComment)
}
// Update comment
function* updateComment(action) {
  const { taskId, comment } = action.payload;
  // Call api
  try {
    yield call(() => jiraService.updateCommentApi(taskId, `<p>${comment}</p>`));
    yield put(actGetTaskDetailSaga(action.taskId))
  }
  catch (err) {
    console.log(err.response?.data);
  }
}

export function* UpdateCommentRequest() {
  yield takeLatest(UPDATE_COMMENT_SAGA, updateComment)
}