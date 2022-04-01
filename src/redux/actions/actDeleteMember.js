import { DELETE_USER_PROJECT_SAGA } from '../constants';

export const actDeleteUserProjectSaga = (userProject) => ({
  type: DELETE_USER_PROJECT_SAGA,
  payload: userProject
})
