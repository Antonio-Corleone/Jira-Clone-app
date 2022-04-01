import { all } from 'redux-saga/effects';
import * as actLogin from './actionSaga/UserLogin';
import * as actGetProject from './actionSaga/GetProjectCategory'
import * as actCreateProject from './actionSaga/CreateProject';
import * as actGetListProject from './actionSaga/GetListProjectSaga';
import * as actEditProject from './actionSaga/EditProject';
import * as actDeleteProject from './actionSaga/DeleteProject';
import * as actGetUserInfo from './actionSaga/GetUser';
import * as actAddMemberProject from './actionSaga/AddMemberProject';
import * as actDeleteMemberProject from './actionSaga/DeleteMemberProject'

function* rootSaga() {
  yield all([
    actLogin.signInRequest(),
    actGetProject.projectCategoryRequest(),
    actCreateProject.CreateProjectRequest(),
    actGetListProject.getListProjectRequest(),
    actEditProject.UpdateProjectRequest(),
    actDeleteProject.DeleteProjectRequest(),
    actGetUserInfo.GetUserRequest(),
    actAddMemberProject.addMemberRequest(),
    actDeleteMemberProject.deleteMemberRequest(),
  ])
}
export default rootSaga;