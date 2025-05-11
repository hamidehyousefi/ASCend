import {Breadcrumbs, Link, Typography} from '@mui/material'
import {FC} from 'react'
import {useNavigate, useParams, useSearchParams} from 'react-router-dom'
import {useCategories} from '../admin/categories/hooks'
import {PostTemplate} from '../home/PostTemplate'
import {useVideos} from '../admin/videos/hooks'
import {Pagination} from 'app/components'

const VideosPage: FC = () => {
  const params = useParams()
  let catId = params?.catId ? Number(params.catId) : 0
  const {data: categories} = useCategories()
  let findCategory = categories?.data?.data.find((rec: any) => rec.id === catId)?.name || ''

  const pageSize = 12
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const video_params = {
    page: Number(page),
    page_size: pageSize,
    category_id: catId,
  }
  const {data, isLoading, isError} = useVideos(video_params)

  const handleChangePage = (_page: number) => {
    setSearchParams({
      page: String(_page),
    })
  }

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
    <Typography key='4' sx={{color: 'text.primary', fontSize: 14}}>
      {catId === 0 ? 'همه' : findCategory}
    </Typography>,
  ]
  return (
    <div>
      <div className='mb-6'>
        <Breadcrumbs separator={<i className='las la-angle-left'></i>} aria-label='breadcrumb'>
          {breadcrumbs}
        </Breadcrumbs>
      </div>
      <h2 className='h2 my-4'>{catId === 0 ? 'همه ویدئوها' : findCategory}</h2>
      <div className='row gy-4 gx-4'>
        {isError
          ? []
          : data?.data?.data?.map((item: any) => (
              <div key={item.id} className='col-md-4 col-xs-12'>
                <PostTemplate item={item} />
              </div>
            ))}
      </div>
      <div className='container w-50 mt-10'>
        <Pagination
          currentPage={Number(page)}
          pageSize={pageSize}
          totalRecords={data?.data?.number}
          onChange={handleChangePage}
        />
      </div>
    </div>
  )
}

export {VideosPage}
