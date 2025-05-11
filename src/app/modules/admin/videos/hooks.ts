import {notification, useErrorHandler} from 'app/utils'
import {reactQueryBasicConfig} from 'app/utils'
import {AxiosError} from 'axios'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {addVideoReq, deleteVideoReq, getVideosReq} from './api'

export const useVideos = (params: any) => {
  const errorHandler = useErrorHandler()
  return useQuery(['videos', params], () => getVideosReq(params), {
    ...reactQueryBasicConfig(),
    onError: (err) => errorHandler(err as AxiosError),
  })
}

export const useAddVideo = (onSuccess: () => void) => {
  const errorHandler = useErrorHandler()
  const queryClient = useQueryClient()
  return useMutation(addVideoReq, {
    onError: (err) => errorHandler(err as AxiosError),
    onSuccess: (res) => {
      if (res?.data.status === 'error') {
        notification.danger(res?.data.data)
        return
      }
      onSuccess()
      queryClient.invalidateQueries(['videos'])
    },
  })
}

export const useDeleteVideo = (onSuccess: () => void) => {
  const errorHandler = useErrorHandler()
  const queryClient = useQueryClient()
  return useMutation(deleteVideoReq, {
    onError: (err) => errorHandler(err as AxiosError),
    onSuccess: (res) => {
      if (res?.data.status === 'error') {
        notification.danger(res?.data.data)
        return
      }
      onSuccess()
      queryClient.invalidateQueries(['videos'])
    },
  })
}
