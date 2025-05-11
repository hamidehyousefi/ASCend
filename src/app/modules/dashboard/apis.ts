import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL
const GET_SERVICES_URL = `${API_URL}/getServices`
const GET_EMAILS_URL = `${API_URL}/getEmails`
const GET_SERVER_STATUS_URL = `${API_URL}/getServerStatus`

export const getServicesReq = async () => {
  return axios.get(GET_SERVICES_URL)
}

export const getEmailsReq = async () => {
  return axios.get(GET_EMAILS_URL)
}

export const getServerStatusReq = async () => {
  return axios.get(GET_SERVER_STATUS_URL)
}
