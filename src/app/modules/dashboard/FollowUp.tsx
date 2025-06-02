import {FC, memo, useEffect, useState, useMemo, useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import questions from './questions.json'
import {Button, RadioInput} from 'app/components'
import LineChart from './LineChart'
import {notification} from 'app/utils'
import {ConfirmDialog} from './ConfirmDialog'
import axios from 'axios'
import {TextField} from '@mui/material'

const FollowUp: FC = () => {
  const [trans_get, setTrans_get] = useState<any>('')
  const [loading, setLoading] = useState<any>(false)
  const navigate = useNavigate()

  const handleChange = (e: any) => {
    const {name, value} = e.target
    setTrans_get(value)
  }
  const handleNavigate = async (trans_get: string) => {
    if (!trans_get) {
      notification.danger('ابتدا کد پیگیری را وارد کنید')
      return
    }
    if (!(trans_get.includes('B') || trans_get.includes('b'))) {
      notification.danger('فرمت کد پیگیری اشتباه است')
      return
    }
    setLoading(true)
    try {
      const response = await fetch(`https://pardakht.liara.run/api/strategist/show/${trans_get}`)
      if (!response.ok) {
        notification.danger('یافت نشد')
      }

      const data = await response.json()
      console.log('داده‌ها:', data)

      // داده‌ها را ذخیره کن
      sessionStorage.setItem('ascend-formData', JSON.stringify(data.form_data))
      sessionStorage.setItem('ascend-results', JSON.stringify(data.results))
      sessionStorage.setItem('ascend-series', JSON.stringify(data.series)) // اینجا اشتباه داشتی: قبلاً `series` خودت رو ذخیره کرده بودی نه data.series
    } catch (error) {
      console.error('خطا:', error)
      notification.danger('خطایی رخ داده است')
    } finally {
      setLoading(false) // چه موفق، چه ناموفق، در پایان همیشه setLoading رو false کن
      navigate(
        `/result?trans_id=${trans_get.split('b')[0]}&id_get=${trans_get.split('b')[1]}&verify=${1}`
      )
    }
  }
  return (
    <div className='card card-xxl-stretch mb-xl-10 theme-dark-bg-body mt-15 h-100'>
      <div className='card-header py-8'>
        <div className='card-title d-flex flex-column fs-4'>نمایش اطلاعات</div>
      </div>

      <div className='card-body px-5 py-10 h-100'>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          <span style={{textAlign: 'right'}}>کد پیگیری:</span>

          <TextField
            name='trans_get'
            margin='dense'
            value={trans_get}
            label='کد پیگیری'
            onChange={handleChange}
          />
          <Button
            title='مشاهده نتیجه'
            size='lg'
            loading={loading}
            onClick={() => {
              handleNavigate(trans_get)
            }}
            className='m-5'
          />
        </div>
      </div>
    </div>
  )
}
export {FollowUp}
