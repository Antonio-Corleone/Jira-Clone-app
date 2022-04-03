import * as actProject from '../constants'

const initialState = {
  projectEdit: {
    "id": 0,
    "projectName": "string",
    "creator": 0,
    "description": "string",
    "categoryId": "2"
  },
  projectDetail:{}
}

const projectReducer =  (state = initialState, action) => {
  switch (action.type) {
    case actProject.EDIT_PROJECT:
      state.projectEdit = action.payload
      return { ...state}
    case actProject.GET_PROJECT_DETAIL:
      state.projectDetail = action.payload
      return { ...state}
    default:
      return state
  }
};

export default projectReducer;
