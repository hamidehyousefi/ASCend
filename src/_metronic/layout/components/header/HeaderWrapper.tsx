/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import {Link, useNavigate} from 'react-router-dom'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {useLayout} from '../../core'
import {DefaultTitle} from './page-title/DefaultTitle'
import {Topbar} from './Topbar'
import {MenuItem} from './MenuItem'
import {useAuth} from 'app/modules/auth/auth'
import {useAdmin, useErrorHandler} from 'app/utils'
import {useEffect, useState} from 'react'
import {getConfigReq} from 'app/modules/admin/settings/api'

export function HeaderWrapper() {
  const {config, classes, attributes} = useLayout()
  const {header, aside} = config
  const {logout} = useAuth()
  let isAdmin = useAdmin()
  const navigate = useNavigate()
  const handleError = useErrorHandler()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>([])

  // const fetchStatus = () => {
  //   setLoading(true)
  //   getConfigReq()
  //     .then((res) => setData(res.data.data))
  //     .catch(handleError)
  //     .finally(() => setLoading(false))
  // }
  // useEffect(fetchStatus, [])
  return (
    <div
      id='kt_header'
      className={clsx('header', classes.header.join(' '), 'align-items-stretch')}
      {...attributes.headerMenu}
    >
      <div
        className={clsx(
          classes.headerContainer.join(' '),
          'd-flex align-items-stretch justify-content-between'
        )}
      >
        {/* begin::Aside mobile toggle */}
        {aside.display && (
          <div className='d-flex align-items-center d-lg-none ms-n3 me-1' title='Show aside menu'>
            <div
              className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
              id='kt_aside_mobile_toggle'
            >
              <KTSVG path='/media/icons/duotune/abstract/abs015.svg' className='svg-icon-2x mt-1' />
            </div>
          </div>
        )}
        {/* end::Aside mobile toggle */}
        {/* begin::Logo */}
        {/* end::Logo */}

        <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0'>
          <Link to='/' className='d-lg-none'>
            <img alt='Logo' src={toAbsoluteUrl('/media/logos/logo_dark.png')} className='h-30px' />
          </Link>
        </div>

        {/* begin::Wrapper */}
        <div className='d-flex align-items-stretch justify-content-between flex-lg-grow-1'>
          {/* begin::Navbar */}
          {header.left === 'menu' && (
            <div className='d-flex align-items-stretch' id='kt_header_nav'>
              {/* <Header /> */}
              <div
                className='header-menu align-items-stretch'
                // data-kt-drawer='true'
                // data-kt-drawer-name='header-menu'
                // data-kt-drawer-activate='{default: true, lg: false}'
                // data-kt-drawer-overlay='true'
                // data-kt-drawer-width="{default:'200px', '300px': '250px'}"
                // data-kt-drawer-direction='end'
                // data-kt-drawer-toggle='#kt_header_menu_mobile_toggle'
                // data-kt-swapper='true'
                // data-kt-swapper-mode='prepend'
                // data-kt-swapper-parent="{default: '#kt_body', lg: '#kt_header_nav'}"
              >
                <div
                  className='menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch'
                  // id='#kt_header_menu'
                  // data-kt-menu='true'
                >
                  <Link to='/'>
                    <img
                      alt='Logo'
                      src={toAbsoluteUrl('/media/logos/logo_dark.png')}
                      className='h-60px'
                    />
                  </Link>

                  {isAdmin ? (
                    <>
                      <MenuItem title='داشبورد' to='/admin/dashboard' />
                      <MenuItem title='ویدئوها' to='/admin/videos' />
                      <MenuItem title='دسته بندی ها' to='/admin/categories' />
                      <MenuItem title='جستجو' to='/admin/search' />
                      <MenuItem title='تنظیمات' to='/admin/settings' />
                      <div className='menu-item me-lg-1'>
                        <div
                          className='menu-link py-3'
                          onClick={() => {
                            logout()
                            navigate('/')
                          }}
                        >
                          <span className='menu-title'>خروج</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <MenuItem title='خانه' to='/home' />
                      {data.length > 1 && data[1].status === 1 && (
                        <MenuItem title='پخش زنده' to='/live' />
                      )}
                      <MenuItem title='فهرست ویدئوها' to='/videos/0' />
                      <MenuItem title='تماس با ما' to='/contact' />
                      <MenuItem title='جستجو' to='/search' />
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {header.left === 'page-title' && (
            <div className='d-flex align-items-center' id='kt_header_nav'>
              <DefaultTitle />
            </div>
          )}

          <div className='d-flex align-items-stretch flex-shrink-0'>
            <Topbar />
          </div>
        </div>
        {/* end::Wrapper */}
      </div>
    </div>
  )
}
