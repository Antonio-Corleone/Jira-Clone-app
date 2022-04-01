import { GET_USER_INFO } from '../constants';

const initialState = {
  userSearch: []
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {

  case GET_USER_INFO:
    return { ...state, userSearch:action.payload }

  default:
    return state
  }
}
export default userReducer;