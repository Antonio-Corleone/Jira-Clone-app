import api from "../utils/apiUtils"

export const jiraService = {
  signInService: (userLogin) => api
    .post('Users/signin', userLogin),

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

  getProjectDetail: (id) => api
    .get(`Project/getProjectDetail?id=${id}`),

  getUserInfo: (keyword) => api
    .get(`Users/getUser?keyword=${keyword}`),

  getUserByProjectId: (projectId) => api
    .get(`Users/getUserByProjectId?idProject=${projectId}`),

  addMemberProject: (userProject) => api
    .post('Project/assignUserProject', userProject),

  deleteMemberProject: (userProject) => api
    .post('Project/removeUserFromProject', userProject),

  getTaskType: () => api
    .get('TaskType/getAll'),

  getTaskPriority: () => api
    .get('Priority/getAll'),

  createNewTaskApi: (newTask) => api
    .post('Project/createTask', newTask),

  getTaskStatus: () => api
    .get('Status/getAll'),

  getTaskDetailApi: (taskId) => api
    .get(`Project/getTaskDetail?taskId=${taskId}`),

  editTaskModalApi: (taskEdit) => api
    .post('Project/updateTask', taskEdit)
}