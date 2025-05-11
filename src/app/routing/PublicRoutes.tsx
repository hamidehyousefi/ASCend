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

export function PublicRoutes() {
  const {toggleDrawer} = useAuth()
  return (
    <>
      {/* {toggleDrawer && <MainDrawer />} */}
      <Routes>
        <Route index element={<Navigate to='/home' />} />
        <Route path='/home' element={<DashboardWrapper />} />
        <Route path='/result' element={<GetResult />} />
        {/* <Route path='/videos/:catId/' element={<VideosPage />} />
        <Route path='/videos/:catId/:videoId' element={<SingleVideo />} />
        <Route path='/search' element={<SearchVideosPage />} />
        <Route path='/contact' element={<ContactPage />} /> */}
        <Route path='error/*' element={<ErrorsPage />} />
      </Routes>
    </>
  )
}
