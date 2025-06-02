import {FC, memo, useEffect, useState, useMemo, useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import questions from './questions.json'
import {Button, RadioInput} from 'app/components'
import LineChart from './LineChart'
import {notification} from 'app/utils'
import {ConfirmDialog} from './ConfirmDialog'
import axios from 'axios'

interface Result {
  label: string
  value: number
}
interface QuestionRowProps {
  id: number
  text: string
  selectedValue?: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const QuestionRow: FC<QuestionRowProps> = memo(({id, text, selectedValue, onChange}) => (
  <div key={id} className='row m-2 py-4' style={{borderBottom: '1px solid #5f656d55'}}>
    <div className='col col-md-6 d-flex flex-row flex-column-fluid fs-5 mb-2 align-self-end'>
      {text.trim()}
    </div>
    <div className='col col-md-6 d-flex flex-center'>
      <div className='row align-items-center'>
        {[1, 2, 3, 4, 5].map((val) => (
          <div key={val} className='col align-self-end'>
            <RadioInput
              label={['بسیار کم', 'کم', 'تا حدودی', 'زیاد', 'بسیار زیاد'][val - 1]}
              name={id.toString()}
              value={val}
              checked={selectedValue === val}
              onChange={onChange}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
))
QuestionRow.displayName = 'QuestionRow'

const DashboardWrapper: FC = () => {
  const navigate = useNavigate()
  const [confirmDialog, setConfirmDialog] = useState({open: false, item: null})
  const data = useMemo(() => Object.entries(questions), [])
  const [formData, setFormData] = useState<Record<string, number>>({})
  const [results, setResults] = useState<Result[]>([])
  const trans_get = localStorage.getItem('trans_get')

  const [series, setSeries] = useState<number[]>([])
  const [loading, setLoading] = useState(false)

  const handlePayment = async (results: any, series: any) => {
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:8000/api/bitpay/send', {
        amount: 1000000,
      })

      const result = response.data
      const id = parseInt(result)

      if (id > 0) {
        window.location.href = `https://bitpay.ir/payment/gateway-${id}-get`
      } else {
        notification.danger('خطا در ایجاد پرداخت: ' + result)
      }
    } catch (error) {
      console.error('خطا:', error)
      notification.danger('خطا در ارتباط با سرور')
    } finally {
      setLoading(false)
    }
  }
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFormData((prev) => ({...prev, [name]: Number(value)}))
  }, [])

  const handleNavigate = useCallback(() => {
    if (trans_get) {
      notification.danger('شما قبلا این فرم را تکمیل کرده اید')
      return
    }
    const totalQuestions = data.reduce((sum, [, items]) => sum + items.length, 0)
    if (Object.keys(formData).length !== totalQuestions) {
      notification.danger('لطفا همه موارد را تکمیل کنید')
      return
    }
    const tempResults: Result[] = []
    const tempSeries: number[] = []

    data.forEach(([label, items]) => {
      const sum = items.map((item) => formData[item.id.toString()] || 0).reduce((a, b) => a + b, 0)
      tempResults.push({label, value: sum})
      tempSeries.push(parseFloat(((sum * 100) / (items.length * 5)).toFixed(2)))
    })
    setResults(tempResults)
    setSeries(tempSeries)

    sessionStorage.setItem('ascend-formData', JSON.stringify(formData))
    sessionStorage.setItem('ascend-results', JSON.stringify(tempResults))
    sessionStorage.setItem('ascend-series', JSON.stringify(tempSeries))

    handlePayment(tempResults, tempSeries)
  }, [data, formData])

  return (
    <>
      {confirmDialog.open && (
        <ConfirmDialog
          item={confirmDialog.item}
          onClose={() => setConfirmDialog({open: false, item: null})}
        />
      )}
      <div className=' mb-2'>
        <div className={`card card-xxl-stretch mb-xl-10  theme-dark-bg-body`}>
          <div className='card-header py-8'>
            <div className='card-title d-flex flex-column'>
              میزان ویژگی ها، توانایی ها، شایستگی ها و مهارت های زیر در شما چقدر است؟
            </div>
          </div>

          {data.map(([category, items]) => (
            <div key={category}>
              {items.map(({id, value}, idx) => (
                <QuestionRow
                  key={id}
                  id={id}
                  text={value}
                  selectedValue={formData[id.toString()]}
                  onChange={handleChange}
                />
              ))}
            </div>
          ))}

          <div className='text-center fs-4'>
            مشاهده نتیجه با پرداخت
            <span className='text-primary fs-3 text-gray-800'> 1,000,000 ریال</span>
            <Button
              title='پرداخت و مشاهده نتیجه'
              size='lg'
              loading={loading}
              onClick={() => {
                handleNavigate()
              }}
              className='m-5'
            />
          </div>
        </div>
      </div>
    </>
  )
}

export {DashboardWrapper}
