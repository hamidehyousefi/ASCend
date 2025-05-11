import {useState, FC, useCallback, useEffect} from 'react'
import {Chip, TextField} from '@mui/material'
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Divider,
  Loading,
  SelectInput,
} from 'app/components'
import {convertToJalali, getTextFromHtml, notification, useErrorHandler} from 'app/utils'
import {getVideoById} from './api'
import {AparatVidoeDetails} from './videoDetails'
import {useCategories} from '../categories/hooks'
import {useAddVideo} from './hooks'

type Props = {
  onClose: () => void
  item: any
}

export const SaveVideoDialog: FC<Props> = ({onClose, item}) => {
  const initialState = {
    aparatId: '',
  }
  const {data: categories, isLoading: categoryLoading, isError: categoryError} = useCategories()
  const {mutate: addVideo, isLoading: addLoading} = useAddVideo(() => {
    notification.success('ویدئو با موفقیت اضافه شد')
    onClose()
  })
  const [formData, setFormData] = useState(initialState)
  const [selectedCategories, setSelectedCategories] = useState(item ? [...item?.categories] : [])
  const [frameUrl, setFrameUrl] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const errorHandler = useErrorHandler()
  const [errors, setErrors] = useState<any>('')
  const fetchRequests = useCallback(
    (aparatId: any) => {
      setLoading(true)
      getVideoById(aparatId)
        .then((res: any) => {
          if (res?.data?.status === 'error') {
            notification.danger(res?.data.data)
            return
          }
          setResult(res?.data.data.video)
          setFrameUrl(
            'https://www.aparat.com/embed/' +
              res?.data?.data?.video?.uid +
              '?data[rnddiv]=43159405569&data[responsive]=yes'
          )
        })
        .catch(errorHandler)
        .finally(() => setLoading(false))
    },
    [errorHandler]
  )
  useEffect(() => {
    if (item) fetchRequests(item.id)
  }, [])
  const validate = () => {
    const errors: any = {}
    const {aparatId} = formData
    if (aparatId === '') errors.aparatId = ' شناسه آپارات الزامی است'
    return errors
  }

  const handleChange = (e: any) => {
    const {value, name} = e.target
    if (name === 'categoryId') {
      let temp: any = [...selectedCategories]
      temp.push(value)
      setSelectedCategories(temp)
    }
    setFormData({...formData, [name]: value})
  }
  const handleSubmit = () => {
    const err = validate()
    setErrors(err)
    if (Object.keys(err).length > 0) return
    if (addLoading) return
    addItem()
  }
  const addItem = () => {
    if (selectedCategories.length === 0) {
      notification.danger('دسته بندی الزامی است')
      return
    }
    let params: any = {
      id: formData.aparatId,
      title: getTextFromHtml(result?.title),
    }
    let temp: any = []
    selectedCategories.forEach((element: any) => {
      temp.push(element.id)
    })
    params.category_ids = temp
    addVideo(params)
  }
  const handleDeleteCat = (catId: any) => {
    setSelectedCategories(selectedCategories.filter((rec: any) => rec.id !== catId))
  }
  return (
    <Dialog screen='xl'>
      <DialogHeader title={item ? 'جزئیات ویدئو' : 'افزودن ویدئو'} onClose={onClose} />
      <DialogBody>
        {!item && (
          <div className='row'>
            <div className='col-md-3 col-xs-12'>
              <TextField
                value={formData.aparatId}
                fullWidth
                label='شناسه آپارات'
                name='aparatId'
                size='small'
                onChange={handleChange}
              />
            </div>
            <div className='col-md-9 col-xs-12'>
              <Button
                color='success'
                title='دریافت اطلاعات از آپارات'
                onClick={() => fetchRequests(formData.aparatId)}
              />{' '}
            </div>
          </div>
        )}
        {loading ? (
          <Loading center />
        ) : (
          <>
            {frameUrl && (
              <div className='row mt-4'>
                <div className='col-md-6 col-xs-12'>
                  <h4>عنوان:</h4>
                  <p>{getTextFromHtml(result?.title)}</p>
                  {/* <p dangerouslySetInnerHTML={{__html: result?.title}} /> */}
                  <Divider className='mb-4' />
                  <h4>توضیحات:</h4>
                  <p>{getTextFromHtml(result?.description || '-')}</p>
                  <Divider className='mb-4' />
                  <div className='row'>
                    <div className='col-md-6'>
                      <h4>تاریخ ایجاد:</h4>
                      <p>{convertToJalali(result.create_date, false)}</p>
                    </div>
                    <div className='col-md-6'>
                      <h4>تعداد بازدید:</h4>
                      <p>{result?.visit_cnt || '-'}</p>
                    </div>
                  </div>
                  <Divider className='mb-4' />
                  {!item && (
                    <SelectInput
                      name='categoryId'
                      // value={''}
                      getOptionLabel={(option: any) => `${option.name}`}
                      label='دسته بندی'
                      disabled={item}
                      readOnly={item}
                      options={categoryError ? [] : categories?.data.data}
                      loading={categoryLoading}
                      className='mb-2'
                      onChange={(e, valueObj) =>
                        handleChange({target: {name: 'categoryId', value: valueObj}})
                      }
                    />
                  )}
                  {selectedCategories.map((rec: any) => (
                    <Chip
                      label={rec.name}
                      className='m-1'
                      key={rec.name}
                      onDelete={() => handleDeleteCat(rec.id)}
                    />
                  ))}
                </div>
                <div className='col-md-6 col-xs-12'>
                  <AparatVidoeDetails src={frameUrl} />
                </div>
              </div>
            )}
          </>
        )}
      </DialogBody>
      <DialogFooter>
        {item ? (
          <Button title='بستن' style='outline' onClick={onClose} />
        ) : (
          <>
            <Button title='تایید' onClick={handleSubmit} loading={addLoading} />
            <Button title='لغو' style='outline' onClick={onClose} />
          </>
        )}
      </DialogFooter>
    </Dialog>
  )
}
