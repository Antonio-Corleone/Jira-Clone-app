import * as actTasks from '../constants';

const initialState = {
  listTaskTypes: [],
  listTaskPriority: [],
  listTaskStatus: [],
}

const createTasksReducer = (state = initialState, action) => {
  switch (action.type) {

  case actTasks.GET_TASK_TYPE:
    return { ...state, listTaskTypes: action.payload}
  case actTasks.GET_TASK_PRIORITY:
    return { ...state, listTaskPriority: action.payload}
  case actTasks.GET_TASK_STATUS:
    return { ...state, listTaskStatus: action.payload}
  default:
    return state
  }
}
export default createTasksReducer;
