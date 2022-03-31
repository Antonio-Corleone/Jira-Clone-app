import * as actEdit from '../constants'

export const actEditProject = (data) => ({
  type: actEdit.EDIT_PROJECT,
  payload: data
})

export const actEditProjectSaga = (data) => ({
  type: actEdit.EDIT_PROJECT_SAGA,
  payload: data
})