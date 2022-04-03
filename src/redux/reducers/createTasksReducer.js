import * as actTasks from '../constants';

const initialState = {
  listTaskTypes: [],
  listTaskPriority: [],
}

const createTasksReducer = (state = initialState, action) => {
  switch (action.type) {

  case actTasks.GET_TASK_TYPE:
    return { ...state, listTaskTypes: action.payload}
  case actTasks.GET_TASK_PRIORITY:
    return { ...state, listTaskPriority: action.payload}
  default:
    return state
  }
}
export default createTasksReducer;
