/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useLayout} from '../core'

interface FooterProps {
  from?: string
}

const Footer: FC<FooterProps> = ({from}) => {
  const {classes} = useLayout()
  const version = process.env.REACT_APP_VERSION
  if (from === 'login') {
    return (
      <div className='footer py-2' id='kt_footer'>
        <div className={`${classes.footerContainer} text-center`}>
          <div className='text-dark-600 mt-8'>
            <span
              className='text-primary hoverable'
              onClick={() => window.open('https://birjand.ac.ir/ict/fa', '_blank')}
            >
              مدیریت توسعه فناوری اطلاعات، امنیت و هوشمندسازی
            </span>
          </div>
          <div className='text-gray-600 my-6'>نسخه {version}</div>

          <div className='text-dark'>
            © کلیه حقوق متعلق به{' '}
            <span
              className='text-primary hoverable'
              onClick={() => window.open('https://birjand.ac.ir', '_blank')}
            >
              دانشگاه بیرجند
            </span>{' '}
            می باشد{' '}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='footer py-2 d-flex flex-lg-column' id='kt_footer'>
      {/* begin::Container */}
      <div
        className={`${classes.footerContainer} d-flex flex-column flex-md-row align-items-center justify-content-between`}
      >
        {/* begin::Copyright */}
        {/* begin::Copyright */}
        <div className='text-dark order-2 order-md-1'>
          © کلیه حقوق متعلق به{' '}
          <span
            className='text-primary hoverable'
            onClick={() => window.open('https://birjand.ac.ir', '_blank')}
          >
            دانشگاه بیرجند
          </span>{' '}
          می باشد{' '}
        </div>
        {/* end::Copyright */}
        <div className='text-dark-600 order-2 order-md-1'>
          <span
            className='text-primary hoverable'
            onClick={() => window.open('https://birjand.ac.ir/ict/fa', '_blank')}
          >
            مدیریت توسعه فناوری اطلاعات، امنیت و هوشمندسازی{' '}
          </span>
        </div>

        <div className='text-gray-600 order-2 order-md-1'>نسخه {version}</div>
        {/* begin::Nav */}
        {/* <ul className='menu menu-gray-600 menu-hover-primary fw-bold order-1'>
          <li className='menu-item'>
            <a href='#' className='menu-link ps-0 pe-2'>
              About
            </a>
          </li>
          <li className='menu-item'>
            <a href='#' className='menu-link pe-0 pe-2'>
              Contact
            </a>
          </li>
          <li className='menu-item'>
            <a href='#' className='menu-link pe-0'>
              Purchase
            </a>
          </li>
        </ul> */}
        {/* end::Nav */}
      </div>
      {/* end::Container */}
    </div>
  )
}

export {Footer}
