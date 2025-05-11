import {notification, useErrorHandler} from 'app/utils'
import {reactQueryBasicConfig} from 'app/utils'
import {AxiosError} from 'axios'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {addCategoryReq, deleteCategoryReq, editCategoryReq, getCategoriesReq} from './api'

export const useCategories = () => {
  const errorHandler = useErrorHandler()
  return useQuery(['categories'], () => getCategoriesReq(), {
    ...reactQueryBasicConfig(),
    onError: (err) => errorHandler(err as AxiosError),
  })
}

export const useAddCategory = (onSuccess: () => void) => {
  const errorHandler = useErrorHandler()
  const queryClient = useQueryClient()
  return useMutation(addCategoryReq, {
    onError: (err) => errorHandler(err as AxiosError),
    onSuccess: (res) => {
      if (res?.data.status === 'error') {
        notification.danger(res?.data.data)
        return
      }
      onSuccess()
      queryClient.invalidateQueries(['categories'])
    },
  })
}

export const useEditCategory = (onSuccess: () => void) => {
  const errorHandler = useErrorHandler()
  const queryClient = useQueryClient()
  return useMutation(editCategoryReq, {
    onError: (err) => errorHandler(err as AxiosError),
    onSuccess: (res) => {
      if (res?.data.status === 'error') {
        notification.danger(res?.data.data)
        return
      }
      onSuccess()
      queryClient.invalidateQueries(['categories'])
    },
  })
}

export const useDeleteCategory = (onSuccess: () => void) => {
  const errorHandler = useErrorHandler()
  const queryClient = useQueryClient()
  return useMutation(deleteCategoryReq, {
    onError: (err) => errorHandler(err as AxiosError),
    onSuccess: (res) => {
      if (res?.data.status === 'error') {
        notification.danger(res?.data.data)
        return
      }
      onSuccess()
      queryClient.invalidateQueries(['categories'])
    },
  })
}
