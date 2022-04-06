import { GET_USER_BY_PROJECT, GET_USER_INFO } from '../constants';

const initialState = {
  userSearch: [],
  listUserProject: [],
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {

  case GET_USER_INFO:
    return { ...state, userSearch:action.payload }
  case GET_USER_BY_PROJECT:
    return { ...state, listUserProject:action.payload }
  default:
    return state
  }
}
export default userReducer;