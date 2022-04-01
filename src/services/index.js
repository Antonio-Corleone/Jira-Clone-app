import api from "../utils/apiUtils"

export const jiraService = {
  signInService: (userLogin) => api
    .post('/Users/signin', userLogin),

  getAllProjectCategory: () => api
    .get('ProjectCategory'),

  createProject: (project) => api
    .post('Project/createProjectAuthorize', project),

  getListProject: () => api
    .get('Project/getAllProject'),

  editProject: (projectUpdate) => api
    .put(`Project/updateProject?projectId=${projectUpdate.id}`, projectUpdate),

  deleteProject: (id) => api
    .delete(`Project/deleteProject?projectId=${id}`),

  getUserInfo: (keyword) => api
    .get(`Users/getUser?keyword=${keyword}`),

  addMemberProject: (userProject) => api
    .post('Project/assignUserProject', userProject),

  deleteMemberProject: (userProject) => api
    .post('Project/removeUserFromProject',userProject)
}