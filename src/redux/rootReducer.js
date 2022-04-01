import { combineReducers } from "redux";

// Import child reducer
import loadingReducer from "./reducers/loadingReducer";
import createProjectReducer from "./reducers/createProjectReducer"
import projectManagementReducer from "./reducers/projectManagementReducer";
import modalPopUpRenderer from "./reducers/modalPopUpReducer";
import projectReducer from "./reducers/projectReducer";
import userReducer from "./reducers/userReducer";


const rootReducer = combineReducers({
  //Child reducer
  loadingReducer,
  createProjectReducer,
  projectManagementReducer,
  modalPopUpRenderer,
  projectReducer,
  userReducer,
});

export default rootReducer;