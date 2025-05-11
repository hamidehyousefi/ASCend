import {TextField} from '@mui/material'
import {CardBody, Button} from 'app/components'
import {notification, stripTag, useErrorHandler} from 'app/utils'
import {useState} from 'react'
import {changePasswordReq} from './apis'

export const ChangePassword: React.FC = () => {
  const initialState = {
    oldPassword: '',
    password: '',
    confirmPassword: '',
  }
  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState<any>(null)
  const handleError = useErrorHandler()
  const validate = () => {
    const errors: any = {}
    const {oldPassword, password, confirmPassword} = formData
    if (oldPassword === '') errors.oldPassword = 'رمز عبور فعلی الزامی است'
    if (password !== '' && password.length < 8)
      errors.password = 'رمز عبور باید حداقل شامل 8 کاراکتر باشد'
    if (password === '') errors.password = 'رمز عبور جدید الزامی است'
    if (confirmPassword !== password) errors.confirmPassword = 'رمز عبور و تکرار آن یکسان نیستند'
    if (confirmPassword === '') errors.confirmPassword = 'تکرار رمز عبور الزامی است'
    return errors
  }
  const handleChange = (e: any) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: stripTag(value)})
    setErrors('')
  }
  const handleSubmit = () => {
    const err = validate()
    setErrors(err)
    if (Object.keys(err).length > 0) return
    let params = {
      oldPassword: formData.oldPassword,
      password: formData.password,
    }
    changePasswordReq(params)
      .then((res) => {
        if (res?.data.status === 'error') {
          notification.danger(res?.data.data)
          return
        }
        notification.success('رمز عبور با موفقیت تغییر یافت')
        setFormData(initialState)
      })
      .catch(handleError)
      .finally()
  }
  return (
    <div className='row justify-content-center'>
      <div className='col-auto w-400px'>
        <CardBody>
          <TextField
            name='oldPassword'
            value={formData.oldPassword}
            autoFocus
            margin='dense'
            autoComplete='new-password'
            label='رمزعبور فعلی'
            onChange={handleChange}
            type='password'
            fullWidth
            error={errors !== null && Boolean(errors.oldPassword)}
            helperText={errors !== null && errors.oldPassword}
          />
          <TextField
            name='password'
            value={formData.password}
            margin='dense'
            autoComplete='new-password'
            label='رمزعبور جدید'
            onChange={handleChange}
            type='password'
            fullWidth
            error={errors !== null && Boolean(errors.password)}
            helperText={errors !== null && errors.password}
          />
          <TextField
            name='confirmPassword'
            value={formData.confirmPassword}
            margin='dense'
            autoComplete='new-password'
            label='تکرار رمزعبور جدید'
            onChange={handleChange}
            type='password'
            fullWidth
            error={errors !== null && Boolean(errors.confirmPassword)}
            helperText={errors !== null && errors.confirmPassword}
          />
          <Button
            title='تایید'
            fullWidth
            size='lg'
            className='btn-primary mt-4'
            onClick={() => handleSubmit()}
            loading={false}
          />
        </CardBody>
      </div>
    </div>
  )
}
