import {Routes, Route, Navigate} from 'react-router-dom'
import {DashboardWrapper} from 'app/modules/dashboard/DashboardWrapper'
import {MainDrawer} from 'app/components'
import {useAuth} from 'app/modules/auth/auth'
import AdminVideosPage from 'app/modules/admin/videos'
import CategoriesPage from 'app/modules/admin/categories'
import SettingsPage from 'app/modules/admin/settings'
import {AdminSearchVideosPage} from 'app/modules/admin/search'
import {ErrorsPage} from 'app/modules/errors/ErrorsPage'
import {FollowUp} from 'app/modules/dashboard/FollowUp'
// import GetResult from 'app/modules/dashboard/GetResult'

export function PrivateRoutes() {
  const {toggleDrawer} = useAuth()
  return (
    <>
      {toggleDrawer && <MainDrawer />}
      <Routes>
        {/* روت پیش‌فرض: اگر URL کاملاً با هیچ‌یک از موارد زیر مطابقت نداشت، به /#/home هدایت شود */}
        <Route index element={<Navigate to='home' replace />} />

        {/* مسیرهای داخلی بدون اسلش ابتدای path */}
        <Route path='home' element={<DashboardWrapper />} />
        <Route path='follow-up' element={<FollowUp />} />
        {/* <Route path="categories" element={<CategoriesPage />} /> */}
        {/* <Route path="settings"  element={<SettingsPage />} /> */}
        {/* <Route path="search"    element={<AdminSearchVideosPage />} /> */}
        <Route path='*' element={<ErrorsPage />} />
        {/* هر مسیر دیگری → برگشت به /home یا صفحه 404 */}
        <Route path='*' element={<Navigate to='home' replace />} />
      </Routes>
    </>
  )
}
