import { combineReducers } from "redux";

// Import child reducer
import loadingReducer from "./reducers/loadingReducer";
import createProjectReducer from "./reducers/createProjectReducer"
const rootReducer = combineReducers({
  //Child reducer
  loadingReducer,
  createProjectReducer
});

export default rootReducer;