import {useEffect} from 'react'
import {toAbsoluteUrl} from '_metronic/helpers'
import {useNavigate} from 'react-router'
import {useAuth} from './auth'
import {Button} from 'app/components'
import {Footer} from '_metronic/layout/components/Footer'

export function LogoutPage() {
  const navigate = useNavigate()
  const {logout} = useAuth()
  useEffect(logout, [])

  return (
    <div
      className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
      style={{
        backgroundImage: `url(${toAbsoluteUrl('/media/img/bg4.jpg')})`,
        backgroundSize: 'cover',
      }}
    >
      <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
        {/* begin::Wrapper */}
        <div className='w-lg-300px bg-white rounded shadow-sm p-10 mx-auto'>
          <div className='card'>
            <h6 className='my-4'>با موفقیت خارج شدید.</h6>
            <Button
              title='ورود مجدد'
              onClick={() => {
                navigate('/auth')
                // window.location.reload()
              }}
            />
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}
