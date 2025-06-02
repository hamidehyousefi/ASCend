import {Button} from 'app/components'
import {FC} from 'react'
import {useNavigate} from 'react-router-dom'

export const Pay: FC = () => {
  const navigate = useNavigate()

  const handleSubmit = () => {
    // window.location.assign('https://ascendpay.ir.page')
    navigate('/result')
  }
  return (
    <div className='text-center'>
      <iframe
        src='https://ascendpay.ir.page'
        width='100%'
        height='700'
        style={{border: 'none'}}
        title='صفحه اصلی Ascend'
      ></iframe>{' '}
      <Button color='light' title='مشاهده نتیجه بدون پرداخت' onClick={handleSubmit} />
    </div>
  )
}
