import { GET_PROJECT_CATEGORY_SAGA, GET_PROJECT_CATEGORY } from '../constants';

export const actGetProjectCategorySaga = () => ({
  type: GET_PROJECT_CATEGORY_SAGA,
})

export const actGetProjectCategory =(data)=> ({
  type: GET_PROJECT_CATEGORY,
  payload: data
})