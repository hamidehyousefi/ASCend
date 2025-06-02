import React, {useEffect, useState} from 'react'
import {HeaderWrapper} from './components/header/HeaderWrapper'
import {ScrollTop} from './components/ScrollTop'
import {Content} from './components/Content'
import {PageDataProvider} from './core'
import {useLocation, useNavigate} from 'react-router-dom'
import {MenuComponent} from '../assets/ts/components'
// import {Footer} from './components/Footer'
import {Button} from 'app/components'
import {useErrorHandler} from 'app/utils'
// import {getConfigReq} from 'app/modules/admin/settings/api'
import bg from '../assets/bg5.gif'
import {DashboardWrapper} from 'app/modules/dashboard/DashboardWrapper'
import EnamadLogo from './components/EnamadLogo'

type Props = {
  children?: any
}
const MasterLayout: React.FC<Props> = ({children}) => {
  // const location = useLocation()
  const navigate = useNavigate()
  const handleError = useErrorHandler()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>([])
  const location = useLocation()
  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [location.key])
  // const fetchStatus = () => {
  //   setLoading(true)
  //   getConfigReq()
  //     .then((res) => setData(res.data.data))
  //     .catch(handleError)
  //     .finally(() => setLoading(false))
  // }
  // useEffect(fetchStatus, [])

  // useEffect(() => {
  //   setTimeout(() => {
  //     MenuComponent.reinitialization()
  //   }, 500)
  // }, [])

  // useEffect(() => {
  //   setTimeout(() => {
  //     MenuComponent.reinitialization()
  //   }, 500)
  // }, [location.key])

  return (
    <PageDataProvider>
      <div className='page d-flex flex-row flex-column-fluid'>
        <div className=' d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper />
          {location.pathname === '/home' && (
            <section
              style={{
                position: 'relative',
                maxHeight: '100%',
                overflow: 'hidden',
                marginBottom: -7,
              }}
            >
              <div
                style={{
                  backgroundImage: `url(${bg})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  minWidth: '100%',
                  maxWidth: '100%',
                  minHeight: '100vh',
                  maxHeight: '100vh',
                  objectFit: 'cover',
                  zIndex: -1,
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  backgroundColor: `rgba(31, 39, 43, .7)`,
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  width: '100%',
                }}
              >
                <div style={{marginTop: '25vh'}}>
                  <h2 className='text-white text-center display-3 mx-5'>
                    آیا آماده اید شایستگی های استراتژیست ورزشی خودتان را بسنجید و پیشنهاد کاربردی
                    دریافت کنید؟{' '}
                  </h2>
                  {/* <h3 className='text-white text-center display-3'> */}
                  {/* </h3> */}
                  {/* <div className='text-center text-white fs-3 mx-5'>
                    {' '}
                    سنجش شایستگی های استراتژیست در سازمان های ورزشی(SCASO)
                  </div> */}
                  <div className='text-center text-white fs-3 mx-5'>
                    با‌ تکمیل این پرسشنامه می‌توانید از میزان شایستگی های استراتژیست خود در سازمان
                    های ورزشی آگاهی بدست آورید و با بکارگیری پیشنهادهای کاربردی که ارائه می شود در
                    جهت توسعه و ارتقا خود جهت تبدیل شدن به یک فرد استراتژیست گام بردارید. پس از
                    تکمیل پرسشنامه، مشاهده نتایج کامل با پرداخت امن امکان پذیر است.
                  </div>
                  {/* <h1 className='text-white text-center display-3 mt-10'> */}

                  {/* </h1> */}
                  <div className='text-center mt-10'>
                    <Button
                      color='light'
                      title='شروع پرسشنامه و تحلیل'
                      size='lg'
                      onClick={() => {
                        const el = document.getElementById('kt_content')
                        if (el) {
                          el.scrollIntoView({behavior: 'smooth'})
                        }
                      }}
                      className='m-5'
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          <div id='kt_content' className='content d-flex flex-column flex-column-fluid'>
            <div className='post d-flex flex-column-fluid' id='kt_post'>
              <Content>
                {children}
                {/* <div className=' mb-2'>
                  <div className={`card card-xxl-stretch mb-xl-10  theme-dark-bg-body`}>
                    <div className='card-header py-8'>
                      <div className='card-title d-flex flex-column'>
                        میزان ویژگی ها، توانایی ها، شایستگی ها و مهارت های زیر در شما چقدر است؟
                      </div>
                    </div>
                    <div className='card-body'>
                      <DashboardWrapper />
                      {children}
                    </div>
                  </div>
                </div> */}
                <div className='text-center d-print-none'>
                  <EnamadLogo />
                </div>
              </Content>
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      </div>

      <ScrollTop />
    </PageDataProvider>
  )
}

export {MasterLayout}
