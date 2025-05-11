import {useAuth} from 'app/modules/auth/auth'
import clsx from 'clsx'
import {FC} from 'react'
import {KTSVG} from '../../../helpers'
import {useLayout} from '../../core'

const toolbarButtonMarginClass = 'ms-1 ms-lg-3'

const Topbar: FC = () => {
  const {config} = useLayout()
  const {openDrawerMenu} = useAuth()
  return (
    <>
      <div className='d-flex align-items-stretch flex-shrink-0'>
        {/* begin::User */}
        <div
          className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
          id='kt_header_user_menu_toggle'
        >
          {/* <div
          className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          <img src={toAbsoluteUrl('/media/img/user.jpg')} alt='metronic' />
        </div> */}
        </div>
        {/* end::User */}
        {/* begin::Aside Toggler */}
        {config.header.left === 'menu' && (
          <div className='d-flex align-items-center d-lg-none ms-2 me-n3' title='Show header menu'>
            <div
              className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
              // id='kt_header_menu_mobile_toggle'
              onClick={() => openDrawerMenu()}
            >
              <KTSVG path='/media/icons/duotune/text/txt001.svg' className='svg-icon-1' />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export {Topbar}
