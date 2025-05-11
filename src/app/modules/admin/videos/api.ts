import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL
const GET_VIDEO_BY_ID_URL = `${API_URL}/getVideoInfo/`

const ADD_VIDEO_URL = `${API_URL}/addVideo/`
const DELETE_VIDEO_URL = `${API_URL}/deleteVideo/`
const GET_VIDEOS_LIST_URL = `${API_URL}/getVideosList/`

export const getVideosReq = async (params: any) => {
  let url = GET_VIDEOS_LIST_URL + params.page_size + '?page=' + params.page
  if (params?.category_id > 0) url += String('&category_id=' + params.category_id)
  if (params?.title) url += String('&title=' + params.title)
  return axios.get(url)
}

export const addVideoReq = async (params: any) => {
  return axios.post(ADD_VIDEO_URL, params)
}

export const deleteVideoReq = async (params: any) => {
  return axios.post(DELETE_VIDEO_URL, params)
}

export const getVideoById = async (id: string) => {
  return axios.get(GET_VIDEO_BY_ID_URL + id)
}
