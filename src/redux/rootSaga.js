import { all } from 'redux-saga/effects';
import * as actLogin from './actionSaga/UserLogin';
import * as actGetProject from './actionSaga/GetProjectCategory'
import * as actCreateProject from './actionSaga/CreateProject'

function* rootSaga() {
  yield all([
    actLogin.signInRequest(),
    actGetProject.projectCategoryRequest(),
    actCreateProject.CreateProjectRequest(),
  ])
}
export default rootSaga;