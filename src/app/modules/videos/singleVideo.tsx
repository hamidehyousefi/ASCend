import {Breadcrumbs, Link, Typography} from '@mui/material'
import {Card, CardBody, CardHeader} from 'app/components'
import useScript from 'app/hooks/useScript'
import {
  convertToJalali,
  getCurrentDate,
  getTextFromHtml,
  notification,
  useErrorHandler,
} from 'app/utils'
import {FC, Fragment, useCallback, useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useCategories} from '../admin/categories/hooks'
import {getVideoById} from '../admin/videos/api'
import {useVideos} from '../admin/videos/hooks'
import {RelatedVideos} from './relatedVideos'

const SingleVideo: FC = () => {
  const params = useParams()
  let catId = params?.catId ? Number(params.catId) : 0
  let videoId = params?.videoId || ''
  useScript(
    'https://www.aparat.com/embed/' + videoId + '?data[rnddiv]=43159405568&data[responsive]=yes'
  )

  const video_params = {
    page: 1,
    page_size: 5,
    category_id: catId,
  }
  const {data, isLoading, isError} = useVideos(video_params)

  const {data: categories} = useCategories()
  let findCategory = categories?.data?.data.find((rec: any) => rec.id === catId)?.name || ''
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const errorHandler = useErrorHandler()
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
    fetchRequests(videoId)
  }, [videoId])

  const navigate = useNavigate()
  const breadcrumbs = [
    <Link
      underline='hover'
      key='1'
      color='info'
      onClick={() => navigate('/home')}
      className='fs-5 hoverable'
    >
      خانه
    </Link>,
    <Link
      underline='hover'
      key='2'
      color='info'
      onClick={() => navigate('/videos/0')}
      className='fs-5 hoverable'
    >
      ویدئوها
    </Link>,
    <Link
      underline='hover'
      key='3'
      color='info'
      onClick={() => navigate('/videos/' + catId)}
      className='fs-5 hoverable'
    >
      {findCategory}
    </Link>,
    <Typography key='4' sx={{color: 'text.primary', fontSize: 14}}>
      {getTextFromHtml(result?.title)}
    </Typography>,
  ]

  return (
    <div>
      <div className='mb-6'>
        <Breadcrumbs separator={<i className='las la-angle-left'></i>} aria-label='breadcrumb'>
          {breadcrumbs}
        </Breadcrumbs>
      </div>
      <div className='row gy-4'>
        <div className='col-md-8 col-xs-12'>
          <Card>
            <CardHeader title={getTextFromHtml(result?.title)} />
            <CardBody>
              <div className='container' style={{width: '90%'}}>
                <div id='43159405568'></div>
                <div className='d-flex justify-content-between my-4'>
                  <div className='text-muted'>
                    {' '}
                    تاریخ انتشار: {convertToJalali(result?.create_date || getCurrentDate(), false)}
                  </div>
                  <div className='text-muted'> بازدید: {result?.visit_cnt}</div>
                </div>
                <h4 className='my-8'>توضیحات:</h4>
                <h6 className='text-muted'>{getTextFromHtml(result?.description || '-')}</h6>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className='col-md-4 col-xs-12'>
          <Card>
            <CardHeader title='ویدئوهای مشابه' />
            <CardBody>
              {isError
                ? []
                : data?.data?.data
                    .filter((rec: any) => rec.id !== videoId)
                    .map((item: any) => (
                      <Fragment key={item.id}>
                        <RelatedVideos item={item} />
                      </Fragment>
                    ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export {SingleVideo}
