import {Routes, Route, Navigate} from 'react-router-dom'
import {MainDrawer} from 'app/components'
import {useAuth} from 'app/modules/auth/auth'
import {HomeWrapper} from 'app/modules/home'
import {VideosPage} from 'app/modules/videos'
import {SingleVideo} from 'app/modules/videos/singleVideo'
import {LivePage} from 'app/modules/live'
import {SearchVideosPage} from 'app/modules/search'
import {ContactPage} from 'app/modules/contact'
import {GetResult} from 'app/modules/dashboard/GetResult'
import {DashboardWrapper} from 'app/modules/dashboard/DashboardWrapper'
import {ErrorsPage} from 'app/modules/errors/ErrorsPage'
import {Pay} from 'app/modules/dashboard/Pay'
import {FollowUp} from 'app/modules/dashboard/FollowUp'

export function PublicRoutes() {
  const {toggleDrawer} = useAuth()
  return (
    <>
      {toggleDrawer && <MainDrawer />}
      <Routes>
        {/* روت پیش‌فرض: اگر مسیر دقیق نباشد، به /#/home هدایت شود */}
        <Route index element={<Navigate to='home' replace />} />

        {/* مسیرهای اصلی (بدون اسلش ابتدای path) */}
        <Route path='home' element={<DashboardWrapper />} />
        <Route path='result' element={<GetResult />} />
        <Route path='pay' element={<Pay />} />
        <Route path='follow-up' element={<FollowUp />} />

        {/* هر مسیر دیگری → صفحه خطا */}
        <Route path='*' element={<ErrorsPage />} />
      </Routes>
    </>
  )
}
