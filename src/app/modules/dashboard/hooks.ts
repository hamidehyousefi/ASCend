import {useErrorHandler} from 'app/utils'
import {getEmailsReq, getServerStatusReq, getServicesReq} from './apis'
import {useQuery} from 'react-query'
import {reactQueryBasicConfig} from 'app/utils'
import {AxiosError} from 'axios'

export const useServices = () => {
  const errorHandler = useErrorHandler()
  return useQuery(['services'], () => getServicesReq(), {
    ...reactQueryBasicConfig(),
    onError: (err) => errorHandler(err as AxiosError),
  })
}

export const useEmails = () => {
  const errorHandler = useErrorHandler()
  return useQuery(['emails'], () => getEmailsReq(), {
    ...reactQueryBasicConfig(),
    onError: (err) => errorHandler(err as AxiosError),
  })
}

export const useServerStatus = () => {
  const errorHandler = useErrorHandler()
  return useQuery(['serverStatus'], () => getServerStatusReq(), {
    ...reactQueryBasicConfig(),
    onError: (err) => errorHandler(err as AxiosError),
  })
}
