import * as actTasks from '../constants'

export const actGetTaskTypeSaga = () => ({
  type: actTasks.GET_TASK_TYPE_SAGA,
});

export const actGetTaskType = (taskType) => ({
  type: actTasks.GET_TASK_TYPE,
  payload: taskType
})

export const actGetTaskPrioritySaga = () => ({
  type: actTasks.GET_TASK_PRIORITY_SAGA
})

export const actGetTaskPriority = (taskPriority) => ({
  type: actTasks.GET_TASK_PRIORITY,
  payload: taskPriority
})

export const actGetTaskStatusSaga = () => ({
  type: actTasks.GET_TASK_STATUS_SAGA
})
export const actGetTaskStatus = (taskStatus) => ({
  type: actTasks.GET_TASK_STATUS,
  payload: taskStatus
})

export const actCreateNewTaskSaga = (newTask) => ({
  type: actTasks.CREATE_NEW_TASK_SAGA,
  payload: newTask
})

export const actGetTaskDetailSaga = (taskId) => ({
  type: actTasks.GET_TASK_DETAIL_SAGA,
  payload: taskId
})

export const actGetTaskDetail = (task) => ({
  type: actTasks.GET_TASK_DETAIL,
  payload: task
})

export const actEditTaskModal = (taskEdit) => ({
  type: actTasks.EDIT_TASK_MODAL,
  payload: taskEdit
})

export const actRemoveUserAssignee = (userId) => ({
  type: actTasks.REMOVE_USER_ASSIGNEE,
  payload: userId
})

export const actUpdateTaskModalSaga = (actType,taskEdit) => ({
  type: actTasks.EDIT_TASK_MODAL_SAGA,
  actionType:actType,
  payload: taskEdit
})

export const actUpdateTaskStatusSaga = (taskStatus,projectId) => ({
  type: actTasks.UPDATE_TASK_STATUS_SAGA,
  payload: taskStatus,
  projectId
})