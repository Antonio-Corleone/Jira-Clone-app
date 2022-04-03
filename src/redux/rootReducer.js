import { combineReducers } from "redux";

// Import child reducer
import loadingReducer from "./reducers/loadingReducer";
import createProjectReducer from "./reducers/createProjectReducer"
import projectManagementReducer from "./reducers/projectManagementReducer";
import modalPopUpRenderer from "./reducers/modalPopUpReducer";
import projectReducer from "./reducers/projectReducer";
import userReducer from "./reducers/userReducer";
import createTasksReducer from "./reducers/createTasksReducer"


const rootReducer = combineReducers({
  //Child reducer
  loadingReducer,
  createProjectReducer,
  projectManagementReducer,
  modalPopUpRenderer,
  projectReducer,
  userReducer,
  createTasksReducer
});

export default rootReducer;