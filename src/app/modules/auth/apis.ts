import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL
const LOGIN_USER_URL = `${API_URL}/login`
const LOGOUT_USER_URL = `${API_URL}/logout`
const GET_USER_URL = `${API_URL}/getUserInfo`
const CHANGE_PASSWORD_URL = `${API_URL}/changePassword`

export const loginReq = async (requestBody: any) => {
  return axios.post(LOGIN_USER_URL, requestBody)
}

export const logoutReq = async () => {
  return axios.post(LOGOUT_USER_URL)
}

export const getMeReq = async () => {
  return axios.get(GET_USER_URL)
}

export const changePasswordReq = async (requestBody: any) => {
  return axios.post(CHANGE_PASSWORD_URL, requestBody)
}
