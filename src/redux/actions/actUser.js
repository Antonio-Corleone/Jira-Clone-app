import * as actUser from "../constants";
// User login
export const actionLogin = (email,password) => ({
  type: actUser.USER_SIGNIN_SAGA,
  userLogin: {
    email: email,
    password: password,
  }
})
// Get user Api
export const actGetUserApiSaga = (keyword) => ({
  type: actUser.GET_USER_INFO_SAGA,
  payload: keyword
})

export const actGetUserApi = (listUser) => ({
  type: actUser.GET_USER_INFO,
  payload: listUser
})
// Add user to project
export const actAddUserProjectSaga = (userProject) => ({
  type: actUser.ADD_USER_PROJECT_SAGA,
  payload: userProject
})
// Remove user from project
export const actDeleteUserProjectSaga = (userProject) => ({
  type: actUser.DELETE_USER_PROJECT_SAGA,
  payload: userProject
})
// Get user by project id
export const actGetUserByProjectIdSaga = (projectId) =>({
  type: actUser.GET_USER_BY_PROJECT_SAGA,
  payload: projectId
})

export const actGetUserByProjectId = (user) => ({
  type: actUser.GET_USER_BY_PROJECT,
  payload: user
})