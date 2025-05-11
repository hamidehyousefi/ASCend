import {useState, FC} from 'react'
import {TextField} from '@mui/material'
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader} from 'app/components'
import {notification} from 'app/utils'
import {useAddCategory, useEditCategory} from './hooks'

type Props = {
  onClose: () => void
  item: any
}

export const SaveCategoryDialog: FC<Props> = ({onClose, item}) => {
  const initialState = {
    name: '',
  }
  const updateState = {
    name: item?.name,
  }
  const [formData, setFormData] = useState(item ? updateState : initialState)
  const [errors, setErrors] = useState<any>('')
  const validate = () => {
    const errors: any = {}
    const {name} = formData
    if (name === '') errors.name = 'عنوان الزامی است'
    return errors
  }

  const {mutate: addCategory, isLoading: addLoading} = useAddCategory(() => {
    notification.success('دسته بندی با موفقیت اضافه شد')
    onClose()
  })
  const {mutate: editCategory, isLoading: editLoading} = useEditCategory(() => {
    notification.success('دسته بندی با موفقیت ویرایش شد')
    onClose()
  })
  const handleChange = (e: any) => {
    const {value, name} = e.target
    setFormData({...formData, [name]: value})
  }
  const handleSubmit = () => {
    const err = validate()
    setErrors(err)
    if (Object.keys(err).length > 0) return
    if (addLoading || editLoading) return
    if (item) updateItem()
    else addItem()
  }
  const addItem = () => {
    let params: any = {
      name: formData.name,
    }
    addCategory(params)
  }
  const updateItem = () => {
    let params: any = {
      id: item.id,
      name: formData.name,
    }
    editCategory(params)
  }
  return (
    <Dialog screen='md'>
      <DialogHeader title={item ? 'ویرایش دسته بندی' : 'افزودن دسته بندی'} onClose={onClose} />
      <DialogBody>
        <TextField
          value={formData.name}
          fullWidth
          label='عنوان'
          name='name'
          onChange={handleChange}
          helperText={errors !== null && errors?.name}
          error={errors !== null && errors?.name !== undefined}
        />
      </DialogBody>
      <DialogFooter>
        <Button title='تایید' onClick={handleSubmit} loading={addLoading || editLoading} />
        <Button title='لغو' style='outline' onClick={onClose} />
      </DialogFooter>
    </Dialog>
  )
}
