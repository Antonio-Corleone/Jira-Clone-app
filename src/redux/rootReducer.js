import { combineReducers } from "redux";

// Import child reducer
import loadingReducer from "./reducers/loadingReducer";
import createProjectReducer from "./reducers/createProjectReducer"
import projectManagementReducer from "./reducers/projectManagementReducer"


const rootReducer = combineReducers({
  //Child reducer
  loadingReducer,
  createProjectReducer,
  projectManagementReducer
});

export default rootReducer;