import { CREATE_PROJECT_SAGA } from '../constants'

export const actCreateProject = (project)=> ({
  type: CREATE_PROJECT_SAGA,
  payload: project
})