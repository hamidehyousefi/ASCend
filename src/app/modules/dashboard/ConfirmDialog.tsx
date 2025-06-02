import {useState, FC, useEffect} from 'react'
import {TextField} from '@mui/material'
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader} from 'app/components'
import {notification} from 'app/utils'
import {useNavigate} from 'react-router-dom'
// import {useAddCategory, useEditCategory} from './hooks'

type Props = {
  onClose: () => void
  item: any
}

export const ConfirmDialog: FC<Props> = ({onClose, item}) => {
  const navigate = useNavigate()
  const initialState = {
    name: '',
  }
  const updateState = {
    name: item?.name,
  }
  const [formData, setFormData] = useState(item ? updateState : initialState)
  const [errors, setErrors] = useState<any>('')
  const ExternalRedirect: FC<{to: string}> = ({to}) => {
    useEffect(() => {
      window.location.href = to
    }, [to])
    return null
  }
  const handleChange = (e: any) => {
    const {value, name} = e.target
    setFormData({...formData, [name]: value})
  }
  const handleSubmit = () => {
    // window.location.assign('https://ascendpay.ir.page')
    navigate('/pay')
  }
  return (
    <Dialog screen='md'>
      <DialogHeader title={'پرداخت هزینه'} onClose={onClose} />
      <DialogBody>
        <div>برای مشاهده نتیجه لازم است تنها مبلغ 1000 تومان پرداخت کنید.</div>
      </DialogBody>
      <DialogFooter>
        <Button title='تایید' onClick={handleSubmit} />
        <Button title='لغو' style='outline' onClick={onClose} />
      </DialogFooter>
    </Dialog>
  )
}
