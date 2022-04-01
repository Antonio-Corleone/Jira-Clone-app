import { GET_USER_INFO_SAGA, GET_USER_INFO } from '../constants';


export const actGetUserApiSaga = (keyword) => ({
  type: GET_USER_INFO_SAGA,
  payload: keyword
})

export const actGetUserApi = (listUser) => ({
  type: GET_USER_INFO,
  payload: listUser
})

