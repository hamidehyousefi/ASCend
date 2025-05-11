import {getLocalStorage, removeAllLocalStorage} from 'app/utils'
import {createContext, FC, useContext, useState} from 'react'
import {useQueryClient} from 'react-query'
import {logoutReq} from './apis'

type AuthContextProps = {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
  removeLocalData: () => void
  openDrawerMenu: () => void
  closeDrawerMenu: () => void
  toggleDrawer: boolean
}

const initAuthContextPropsState = {
  isLoggedIn: false,
  toggleDrawer: false,
  login: () => {},
  logout: () => {},
  removeLocalData: () => {},
  openDrawerMenu: () => {},
  closeDrawerMenu: () => {},
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}
type Props = {
  children: any
}
const AuthProvider: FC<Props> = ({children}) => {
  const queryClient = useQueryClient()
  const [isLoggedIn, setIsLoggedIn] = useState(!!getLocalStorage('auth'))
  const [toggleDrawer, setToggleDrawer] = useState(false)

  const logout = async () => {
    await logoutReq()
      .then(() => {
        queryClient.removeQueries()
        removeAllLocalStorage()
        setIsLoggedIn(false)
      })
      .catch((err) => {
        queryClient.removeQueries()
        removeAllLocalStorage()
        setIsLoggedIn(false)
      })
  }

  const removeLocalData = () => {
    queryClient.removeQueries()
    removeAllLocalStorage()
    setIsLoggedIn(false)
  }

  const login = () => {
    setIsLoggedIn(true)
  }
  const openDrawerMenu = () => {
    setToggleDrawer(true)
  }
  const closeDrawerMenu = () => {
    setToggleDrawer(false)
  }

  return (
    <AuthContext.Provider
      value={{
        logout,
        isLoggedIn,
        toggleDrawer,
        openDrawerMenu,
        closeDrawerMenu,
        login,
        removeLocalData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export {AuthProvider, useAuth} //AuthInit
