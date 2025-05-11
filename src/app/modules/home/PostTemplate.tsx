import {Card, CardBody, Loading} from 'app/components'
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

export const PostTemplate: FC<Props> = ({item}) => {
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
  if (loading) return <Loading center />
  return (
    <div
      className='hoverable'
      onClick={() => navigate('/videos/' + item.categories[0].id + '/' + item.id)}
    >
      <Card shadow className='h-370px hoverable bg-hover-light-primary text-hover-white'>
        <div className='card-header border-1' style={{minHeight: 50}}>
          <div className='card-title fs-6'>{getTextFromHtml(item?.title)}</div>
        </div>
        <CardBody className='p-0'>
          <div
            className='shadow-xs h-250px'
            style={{
              backgroundImage: `url('${result?.big_poster}')`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
        </CardBody>
        <div className='card-footer px-4 py-4'>
          <div className='d-flex justify-content-between'>
            <div className='text-muted'>
              {' '}
              تاریخ انتشار: {convertToJalali(result?.create_date || getCurrentDate(), false)}
            </div>
            <div className='text-muted'> بازدید: {result?.visit_cnt}</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
