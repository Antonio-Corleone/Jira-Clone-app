import * as actLoad from '../constants'


const initialState = { loadStatus: false }

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actLoad.SHOW_LOADING:
      state.loadStatus = true;
      return {...state}
    case actLoad.HIDE_LOADING:
      state.loadStatus = false;
      return {...state}
    default:
      return state
  }
}
export default loadingReducer
