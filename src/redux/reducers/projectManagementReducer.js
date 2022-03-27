import {GET_LIST_PROJECT} from '../constants'

const initialState = {
  projectList: [],
}

const projectManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_PROJECT:
      state.projectList = action.payload
      return { ...state}
    default:
      return { ...state }
  }
};

export default projectManagementReducer;
