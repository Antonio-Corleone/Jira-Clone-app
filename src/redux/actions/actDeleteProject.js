import { DELETE_PROJECT_SAGA } from '../constants'

export const actDeleteProject = (id) => ({
  type: DELETE_PROJECT_SAGA,
  payload: id
})
