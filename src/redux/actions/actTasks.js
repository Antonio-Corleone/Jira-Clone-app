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
