import {FC} from 'react'
import {useCategories} from '../admin/categories/hooks'
import {useVideos} from '../admin/videos/hooks'
import {PostTemplate} from './PostTemplate'
import {PostCategories} from './PostCategories'

const HomeWrapper: FC = () => {
  const {data: categories, isLoading: categoryLoading} = useCategories()
  const params = {
    page: 1,
    page_size: 3,
  }
  const {data: latestVideos, isLoading: latestLoading, isError: latestError} = useVideos(params)
  return (
    <div>
      {(!latestLoading || !latestError) && (
        <div>
          <h2 className='h2 my-4'>جدیدترین ویدئوها</h2>
          <div className='row'>
            {latestError
              ? []
              : latestVideos?.data?.data?.map((item: any) => (
                  <div key={item.id} className='col-md-4 col-xs-12'>
                    <PostTemplate item={item} />
                  </div>
                ))}
          </div>
        </div>
      )}
      {!categoryLoading && (
        <>
          {categories?.data.data.map((item: any) => (
            <PostCategories category={item} key={item.id} />
          ))}
        </>
      )}
    </div>
  )
}

export {HomeWrapper}
