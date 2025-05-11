import {FC} from 'react'
import {Route, Navigate, Routes} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import {PrivateRoutes} from './PrivateRoutes'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {MasterInit} from '../../_metronic/layout/MasterInit'
import {LogoutPage} from 'app/modules/auth/Logout'
import {PublicRoutes} from './PublicRoutes'
import {LoginPage} from 'app/modules/auth/Login'
import {useAuth} from 'app/modules/auth/auth'

export const AppRoutes: FC = () => {
  const {isLoggedIn} = useAuth()
  return (
    <>
      <Routes>
        <Route index element={<Navigate to='/home' />} />
        {isLoggedIn ? (
          <>
            <Route path='auth' element={<Navigate to='/admin/dashboard' />} />
          </>
        ) : (
          <>
            <Route path='admin/*' element={<Navigate to='/auth' />} />
            <Route path='auth' element={<LoginPage />} />
          </>
        )}
        <Route
          path='/*'
          element={
            <MasterLayout>
              <PublicRoutes />
            </MasterLayout>
          }
        />
        {isLoggedIn && (
          <Route
            path='admin/*'
            element={
              <MasterLayout>
                <PrivateRoutes />
              </MasterLayout>
            }
          />
        )}
        <Route path='error/*' element={<ErrorsPage />} />
        <Route path='logout' element={<LogoutPage />} />
      </Routes>
      <MasterInit />
    </>
  )
}
