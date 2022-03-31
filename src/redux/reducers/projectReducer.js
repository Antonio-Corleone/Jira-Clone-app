import * as actEdit from '../constants'

const initialState = {
  projectEdit: {
    "id": 0,
    "projectName": "string",
    "creator": 0,
    "description": "string",
    "categoryId": "2"
  }
}

const projectReducer =  (state = initialState, action) => {
  switch (action.type) {
    case actEdit.EDIT_PROJECT:
      state.projectEdit = action.payload
      return { ...state}

    default:
      return state
  }
};

export default projectReducer;
