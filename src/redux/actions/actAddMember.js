import { ADD_USER_PROJECT_SAGA } from '../constants';

export const actAddUserProjectSaga = (userProject) => ({
  type: ADD_USER_PROJECT_SAGA,
  payload: userProject
})
