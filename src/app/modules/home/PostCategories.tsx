import {Button, Loading} from 'app/components'
import {FC} from 'react'
import {useVideos} from '../admin/videos/hooks'
import {PostTemplate} from './PostTemplate'
import {useNavigate} from 'react-router-dom'

type Props = {
  category: any
}

export const PostCategories: FC<Props> = ({category}) => {
  const navigate = useNavigate()
  const params = {
    page: 1,
    page_size: 3,
    category_id: category.id,
  }
  const {data, isLoading, isError} = useVideos(params)
  if (isLoading) return <Loading center />
  if (data?.data?.data?.length === 0) return <></>
  return (
    <div className='my-15'>
      <div className='row'>
        <h2 className='h2 my-4'>{category.name}</h2>
        {data?.data?.data?.length === 0 && (
          <h6 className='text-center h1 text-muted'>
            ویدئویی در دسته بندی {category.name} وجود ندارد
          </h6>
        )}
        {isError
          ? []
          : data?.data?.data?.map((item: any) => (
              <div key={item.id} className='col-md-4 col-xs-12'>
                <PostTemplate item={item} />
              </div>
            ))}
        {data?.data?.number > 3 && (
          <div className='text-end mt-4'>
            <Button
              onClick={() => navigate('/videos/' + category.id)}
              title={`ویدئوهای بیشتر در دسته ${category.name}`}
              className='btn-light-primary'
            />
          </div>
        )}
      </div>
    </div>
  )
}
