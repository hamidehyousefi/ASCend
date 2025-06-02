/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import {Error500} from './components/Error500'
import {Error404} from './components/Error404'
import {toAbsoluteUrl} from '../../../_metronic/helpers'

const ErrorsPage: React.FC = () => {
  const navigate = useNavigate()
  const redirectToDashboard = () => {
    navigate('/home')
  }

  return (
    <div className='d-flex flex-column flex-root'>
      <div
        className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
        style={{backgroundImage: `url('${toAbsoluteUrl('/media/illustrations/progress-hd.png')}')`}}
      >
        <div className='d-flex flex-column flex-column-fluid text-center p-10 py-lg-20'>
          {/* <a href='/dashboard' className='mb-10 pt-lg-20'>
            <img
              alt='Logo'
              src={toAbsoluteUrl('/media/logos/logo_daneshgah.png')}
              className='h-50px mb-5'
            />
          </a> */}
          <div className='pt-lg-10 mb-10'>
            <Routes>
              <Route path='/error/404' element={<Error404 />} />
              <Route path='/error/500' element={<Error500 />} />
              <Route path='error' element={<Navigate to='/error/404' />} />
            </Routes>

            <div className='text-center'>
              <h2 className='my-9'>صفحه مورد نظر شما پیدا نشد.</h2>

              <a onClick={redirectToDashboard} className='btn btn-lg btn-primary fw-bolder'>
                برو به خانه
              </a>
            </div>
          </div>
          <div
            className='
          d-flex
          flex-row-auto
          bgi-no-repeat
          bgi-position-x-center
          bgi-size-contain
          bgi-position-y-bottom
          min-h-100px min-h-lg-350px
        '
            style={{
              backgroundImage: `url('${toAbsoluteUrl('/media/illustrations/sketchy-1/17.png')}')`,
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export {ErrorsPage}
