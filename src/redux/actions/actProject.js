import * as actProject from '../constants'

// Create a new project
export const actCreateProject = (project) => ({
  type: actProject.CREATE_PROJECT_SAGA,
  payload: project
})
// Delete a project
export const actDeleteProject = (id) => ({
  type: actProject.DELETE_PROJECT_SAGA,
  payload: id
})
// Edit a project
export const actEditProject = (data) => ({
  type: actProject.EDIT_PROJECT,
  payload: data
})

export const actEditProjectSaga = (data) => ({
  type: actProject.EDIT_PROJECT_SAGA,
  payload: data
})
// Get list project
export const actGetListProject = (data) => ({
  type: actProject.GET_LIST_PROJECT,
  payload: data
})

export const actGetListProjectSaga = () => ({
  type: actProject.GET_LIST_PROJECT_SAGA
})

export const actGetProjectCategorySaga = () => ({
  type: actProject.GET_PROJECT_CATEGORY_SAGA,
})

export const actGetProjectCategory =(data)=> ({
  type: actProject.GET_PROJECT_CATEGORY,
  payload: data
})