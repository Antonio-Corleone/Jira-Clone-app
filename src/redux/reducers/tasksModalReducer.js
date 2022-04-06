import * as actTask from '../constants'

const initialState = {
  taskDetailModal: {
    "priorityTask": {
      "priorityId": 1,
      "priority": "High"
    },
    "taskTypeDetail": {
      "id": 1,
      "taskType": "bug"
    },
    "assigness": [
      {
        "id": 1482,
        "avatar": "https://ui-avatars.com/api/?name=TuanVu",
        "name": "TuanVu",
        "alias": "tuanvu"
      }
    ],
    "lstComment": [],
    "taskId": 3364,
    "taskName": "task JIRA 01sadasd",
    "alias": "task-jira-01sadasd",
    "description": "<p>sdsdsd</p>",
    "statusId": "2",
    "originalEstimate": 10,
    "timeTrackingSpent": 10,
    "timeTrackingRemaining": 10,
    "typeId": 1,
    "priorityId": 2,
    "projectId": 3995
  }
}

const tasksModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actTask.GET_TASK_DETAIL:
      return { ...state, taskDetailModal: action.payload }
    case actTask.EDIT_TASK_MODAL:
      const { name, value } = action.payload
      return { ...state, taskDetailModal: { ...state.taskDetailModal, [name]: value } }

    case actTask.REMOVE_USER_ASSIGNEE:
      const listAssignee = [...state.taskDetailModal.assigness];
      let index = listAssignee.findIndex(item => item.id = action.payload);
      if (index === -1) {
        return { ...state }
      }
      listAssignee.splice(index, 1);
      state.taskDetailModal.assigness = listAssignee;
      return { ...state }
    default:
      return state
  }
}

export default tasksModalReducer;
