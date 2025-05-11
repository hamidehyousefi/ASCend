import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL
const GET_CONFIG_URL = `${API_URL}/getConfig/`

const SET_LIVE_URL = `${API_URL}/setLive/`
const SET_HOME_PAGE_URL = `${API_URL}/setHomePage/`

export const getConfigReq = async () => {
  return axios.get(GET_CONFIG_URL)
}

export const setLiveReq = async (params: any) => {
  return axios.post(SET_LIVE_URL, params)
}

export const setHomePageReq = async (params: any) => {
  return axios.post(SET_HOME_PAGE_URL, params)
}
