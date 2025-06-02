import {encodeString, notification, setLocalStorage, useErrorHandler} from 'app/utils'
import {useState} from 'react'
import {loginReq} from './apis'
import {toAbsoluteUrl} from '_metronic/helpers'
import {useAuth} from './auth'
// import {Footer} from '_metronic/layout/components/Footer'
import {Button} from 'app/components'
import {useNavigate} from 'react-router-dom'

export function LoginPage() {
  const initialState = {
    username: '',
    password: '',
  }

  const [formData, setFormData] = useState(initialState)
  const {login} = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<any>(null)
  const handleError = useErrorHandler()
  const handleChange = (e: any) => {
    const {value, name} = e.target
    setFormData({...formData, [name]: value})
  }
  const validate = () => {
    const errors: any = {}
    const {username, password} = formData
    if (username === '') errors.username = 'نام کاربری الزامی است'
    if (password === '') errors.password = 'رمز عبور الزامی است'
    return errors
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (loading) return
    const err = validate()
    setErrors(err)
    if (Object.keys(err).length > 0) return
    setLoading(true)
    loginReq(formData)
      .then((res) => {
        if (res?.data.status === 'error') {
          notification.danger(res?.data.data)
          setLoading(false)
          return
        }
        setLocalStorage('auth', res?.data.data.api_token)
        setLocalStorage('name', res?.data.data.name)
        setLocalStorage('loggedIn', encodeString(JSON.stringify(res?.data.data.isAdmin)))
        login()
      })
      .catch(handleError)
      .finally(() => setLoading(false))
  }

  return (
    <div className='d-flex flex-column flex-lg-row flex-column-fluid bg-white'>
      <div
        className='d-none d-lg-flex flex-lg-row-fluid w-50 bgi-size-cover bgi-position-y-center bgi-position-x-start bgi-no-repeat'
        style={{
          backgroundImage: `url(${toAbsoluteUrl('/media/img/bg.png')})`,
        }}
      ></div>
      <div className='d-flex flex-column flex-column-fluid flex-center w-lg-50 p-10'>
        <div className='w-lg-450px  p-10 mx-auto'>
          <form className='form w-100' onSubmit={handleSubmit} noValidate id='kt_login_signin_form'>
            <div className='text-center mb-5'>
              {/* <img
                alt='Logo'
                src={toAbsoluteUrl('/media/logos/logo_daneshgah.png')}
                className='h-45px'
              /> */}
            </div>
            <div className='text-center mb-10'>
              <div className='text-dark mb-3 fs-5'> سنجش شایستگی های استراتژیست (ASC)</div>
            </div>

            <div className='fv-row mb-10'>
              <label className='form-label fs-6 text-dark'>نام کاربری</label>
              <input
                placeholder='نام کاربری خود را وارد نمایید'
                className={`form-control form-control-lg`}
                type='text'
                name='username'
                onChange={handleChange}
                autoComplete='off'
              />
              {errors !== null && errors.username && (
                <div className='fv-plugins-message-container text-danger'>
                  <span role='alert'>{errors.username}</span>
                </div>
              )}
            </div>
            <div className='fv-row mb-10'>
              <div className='d-flex justify-content-between mt-n5'>
                <div className='d-flex flex-stack mb-2'>
                  <label className='form-label text-dark fs-6 mb-0'>رمز عبور</label>
                </div>
              </div>
              <input
                type='password'
                autoComplete='off'
                onChange={handleChange}
                name='password'
                placeholder='رمز عبور خود را وارد نمایید'
                className={`form-control form-control-lg`}
              />
              {errors !== null && errors.password && (
                <div className='fv-plugins-message-container text-danger'>
                  <span role='alert'>{errors.password}</span>
                </div>
              )}
            </div>

            <div className='text-center'>
              <button
                type='submit'
                id='kt_sign_in_submit'
                className='btn btn-lg btn-primary w-100 mb-5'
                disabled={loading}
              >
                {!loading && <span className='indicator-label'>ورود به بخش مدیریت</span>}
                {loading && (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    لطفا صبر کنید ...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
              <Button
                title={'سنجش شایستگی های استراتژیست در سازمان های ورزشی (SCASO)'}
                className='w-100 mt-4'
                color='success'
                size='lg'
                onClick={() => navigate('/home')}
              />
            </div>
          </form>
        </div>
        {/* <Footer from='login' /> */}
      </div>
    </div>
  )
}
