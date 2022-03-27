import { GET_LIST_PROJECT, GET_LIST_PROJECT_SAGA } from '../constants';

export const actGetListProject = (data) => ({
  type: GET_LIST_PROJECT,
  payload: data
})

export const actGetListProjectSaga = () => ({
  type: GET_LIST_PROJECT_SAGA
})