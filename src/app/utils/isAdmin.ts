import {decodeString, getLocalStorage} from './general'

export const useAdmin: any = () => {
  let isAdmin = false
  let encoded = getLocalStorage('loggedIn')
  if (encoded) isAdmin = JSON.parse(decodeString(encoded)) === 1
  return isAdmin
}
