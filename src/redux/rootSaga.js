import { all } from 'redux-saga/effects';
import * as actLogin from './actionSaga/UserLogin';
import * as actGetProject from './actionSaga/GetProjectCategory'

function* rootSaga() {
  yield all([
    actLogin.signInRequest(),
    actGetProject.projectCategoryRequest(),
  ])
}
export default rootSaga;