import { all } from 'redux-saga/effects';
import * as actLogin from './actionSaga/UserLogin';
import * as actGetProject from './actionSaga/GetProjectCategory'
import * as actCreateProject from './actionSaga/CreateProject';
import * as actGetListProject from './actionSaga/GetListProjectSaga'

function* rootSaga() {
  yield all([
    actLogin.signInRequest(),
    actGetProject.projectCategoryRequest(),
    actCreateProject.CreateProjectRequest(),
    actGetListProject.getListProjectRequest(),
  ])
}
export default rootSaga;