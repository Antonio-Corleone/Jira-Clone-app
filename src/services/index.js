import api from "../utils/apiUtils"

export const jiraService = {
  signInService: (userLogin) => api
    .post('/Users/signin', userLogin),

  getAllProjectCategory: () => api
    .get('ProjectCategory')
}