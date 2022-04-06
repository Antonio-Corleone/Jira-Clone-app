import { all } from 'redux-saga/effects';

import * as actProjectSaga from './actionSaga/actProjecSaga';
import * as actUserSaga from './actionSaga/actUserSaga';
import * as actTaskSaga from './actionSaga/actTaskSaga';

function* rootSaga() {
  yield all([
    actUserSaga.SignInRequest(),
    actUserSaga.GetUserRequest(),
    actUserSaga.AddMemberRequest(),
    actUserSaga.RemoveMemberRequest(),
    actUserSaga.getUserProjectRequest(),

    actProjectSaga.CreateProjectRequest(),
    actProjectSaga.DeleteProjectRequest(),
    actProjectSaga.UpdateProjectRequest(),
    actProjectSaga.GetListProjectRequest(),
    actProjectSaga.ProjectCategoryRequest(),
    actProjectSaga.GetProjectIdRequest(),

    actTaskSaga.GetTaskTypeRequest(),
    actTaskSaga.GetTaskPriorityRequest(),
    actTaskSaga.GetTaskStatusRequest(),
    actTaskSaga.CreateNewTaskRequest(),
    actTaskSaga.GetTaskDetailRequest(),
    actTaskSaga.UpdateTaskModalRequest(),
  ])
}
export default rootSaga;