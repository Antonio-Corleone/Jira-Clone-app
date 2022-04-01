import { all } from 'redux-saga/effects';

import * as actProjectSaga from './actionSaga/actProjecSaga';
import * as actUserSaga from './actionSaga/actUserSaga';

function* rootSaga() {
  yield all([
    actUserSaga.SignInRequest(),
    actUserSaga.GetUserRequest(),
    actUserSaga.AddMemberRequest(),
    actUserSaga.RemoveMemberRequest(),

    actProjectSaga.CreateProjectRequest(),
    actProjectSaga.DeleteProjectRequest(),
    actProjectSaga.UpdateProjectRequest(),
    actProjectSaga.GetListProjectRequest(),
    actProjectSaga.ProjectCategoryRequest(),
  ])
}
export default rootSaga;