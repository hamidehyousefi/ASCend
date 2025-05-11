import { useErrorHandler} from 'app/utils'
import {reactQueryBasicConfig} from 'app/utils'
import {AxiosError} from 'axios'
import { useQuery} from 'react-query'
import {
    getMeReq
} from './apis'

export const useUser = () => {
  const errorHandler = useErrorHandler()
  return useQuery(['currentUser'], () => getMeReq(), {
    ...reactQueryBasicConfig(),
    onError: (err) => errorHandler(err as AxiosError),
  })
}