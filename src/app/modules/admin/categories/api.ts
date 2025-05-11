import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL
const ADD_CATEGORY_URL = `${API_URL}/addCategory/`
const EDIT_CATEGORY_URL = `${API_URL}/editCategory/`
const DELETE_CATEGORY_URL = `${API_URL}/deleteCategory/`
const GET_CATEGORIES_LIST_URL = `${API_URL}/getCategoriesList/`

export const getCategoriesReq = async () => {
  return axios.get(GET_CATEGORIES_LIST_URL)
}

export const addCategoryReq = async (params: any) => {
  return axios.post(ADD_CATEGORY_URL, params)
}

export const editCategoryReq = async (params: any) => {
  return axios.post(EDIT_CATEGORY_URL, params)
}

export const deleteCategoryReq = async (params: any) => {
  return axios.post(DELETE_CATEGORY_URL, params)
}
