import { call, takeLatest } from 'redux-saga/effects';
import { notiFunction } from '../../utils/notification';
import { jiraService } from '../../services';
import { INSERT_COMMENT_SAGA } from '../constants';

// Create comment
function* insertComment(action) {
  // Call api
  try {
    yield call(() => jiraService.insertCommentApi(action.payload));
    notiFunction('success', 'Create new comment successfully!')
  }
  catch (err) {
    console.log(err.response?.data);
  }
}

export function* InsertCommentRequest() {
  yield takeLatest(INSERT_COMMENT_SAGA, insertComment)
}
