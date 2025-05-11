import {Divider, Loading} from 'app/components'
import {FC, useCallback, useEffect, useState} from 'react'
import {getVideoById} from '../admin/videos/api'
import {
  convertToJalali,
  getCurrentDate,
  getTextFromHtml,
  notification,
  useErrorHandler,
} from 'app/utils'
import {useNavigate} from 'react-router-dom'

type Props = {
  item: any
}

export const RelatedVideos: FC<Props> = ({item}) => {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const errorHandler = useErrorHandler()
  const navigate = useNavigate()
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
        })
        .catch(errorHandler)
        .finally(() => setLoading(false))
    },
    [errorHandler]
  )
  useEffect(() => {
    fetchRequests(item.id)
  }, [])
  if (loading)
    return (
      <div className='w-100px'>
        <Loading center />
      </div>
    )
  return (
    <div
      className='hoverable'
      onClick={() => navigate('/videos/' + item.categories[0].id + '/' + item.id)}
    >
      <div className='row hoverable'>
        <div className='col-5'>
          <div
            className='shadow-xs card-rounded h-100px'
            style={{
              backgroundImage: `url('${result?.big_poster}')`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
        </div>
        <div className='col-7'>
          <h4 className='text-hover-primary fs-6'>{getTextFromHtml(result?.title)}</h4>
          <div className='mt-6'>
            <div className='text-muted fs-7'>
              {' '}
              تاریخ انتشار: {convertToJalali(result?.create_date || getCurrentDate(), false)}
            </div>
            <div className='text-muted fs-7'> بازدید: {result?.visit_cnt}</div>
          </div>
        </div>
      </div>
      <Divider className='my-3' />
    </div>
  )
}
