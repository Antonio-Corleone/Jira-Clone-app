import *as act from '../constants'

const initialState = {
  arrProjectCategory: []
}

const createProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case act.GET_PROJECT_CATEGORY:
      state.arrProjectCategory = action.payload;
      return { ...state }
    default:
      return { ...state }
  }
};

export default createProjectReducer;
