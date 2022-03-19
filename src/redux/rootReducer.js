import { combineReducers } from "redux";

// Import child reducer
import loadingReducer from "./reducers/loadingReducer";
const rootReducer = combineReducers({
  //Child reducer
  loadingReducer
});

export default rootReducer;