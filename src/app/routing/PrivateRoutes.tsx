import {Routes, Route, Navigate} from 'react-router-dom'
import {DashboardWrapper} from 'app/modules/dashboard/DashboardWrapper'
import {MainDrawer} from 'app/components'
import {useAuth} from 'app/modules/auth/auth'
import AdminVideosPage from 'app/modules/admin/videos'
import CategoriesPage from 'app/modules/admin/categories'
import SettingsPage from 'app/modules/admin/settings'
import {AdminSearchVideosPage} from 'app/modules/admin/search'
// import GetResult from 'app/modules/dashboard/GetResult'

export function PrivateRoutes() {
  const {toggleDrawer} = useAuth()
  return (
    <>
      {/* {toggleDrawer && <MainDrawer />} */}
      <Routes>
        <Route path='/home' element={<DashboardWrapper />} />
        <Route path='auth' element={<Navigate to='/home' />} />
      </Routes>
    </>
  )
}
