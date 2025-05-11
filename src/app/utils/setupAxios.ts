import {useAuth} from 'app/modules/auth/auth'
import {notification, getLocalStorage} from 'app/utils'
import {AxiosError} from 'axios'

import {useCallback} from 'react'

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = 'application/json'
  axios.interceptors.request.use(
    (config: any) => {
      config.headers.Authorization = `Bearer ${getLocalStorage('auth')}`
      return config
    },
    (err: any) => Promise.reject(err)
  )
}
export const useErrorHandler = () => {
  const {logout} = useAuth()
  return useCallback((error: AxiosError) => {
    switch (error.response?.status) {
      case 401:
        logout()
        break
      case 500:
        notification.danger('هنگام تلاش برای برقراری ارتباط با سرور، خطایی رخ داده است ')
        break
      case 99:
        notification.danger('شما به اینترنت متصل نیستید.')
        break
      case 400:
        notification.danger('متاسفانه نمی توانیم به درخواست شما رسیدگی کنیم')
        break
      case 403:
        notification.danger('شما مجاز به انجام این عمل نیستید')
        break
      case 404:
        notification.danger('موردی که به دنبال آن هستید، یافت نشد')
        break
      case 422:
        notification.danger(error.response.data.message)
        break
      case 409:
        notification.danger(error.response.data.data.message)
        break
      default:
        notification.danger('خطای ناشناخته')
    }
  }, [])
}
