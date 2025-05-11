import {Card, CardBody, Loading} from 'app/components'
import {useErrorHandler} from 'app/utils'
import {FC, useEffect, useState} from 'react'
import {getConfigReq} from '../admin/settings/api'

const LivePage: FC = () => {
  const handleError = useErrorHandler()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>([])

  const fetchStatus = () => {
    setLoading(true)
    getConfigReq()
      .then((res) => setData(res.data.data))
      .catch(handleError)
      .finally(() => setLoading(false))
  }
  useEffect(fetchStatus, [])
  return (
    <Card shadow>
      <div className='card-header border-1'>
        <div className='card-title'>پخش زنده</div>
      </div>
      <CardBody>
        {loading ? (
          <Loading center />
        ) : (
          <>
            {data.length > 1 && data[1].status === 1 && (
              <div className='h_iframe-aparat_embed_frame container w-75'>
                <span style={{display: 'block', paddingTop: '57%'}}></span>
                <iframe
                  allowFullScreen={true}
                  loading='lazy'
                  src={`https://www.aparat.com/embed/live/${data[1]?.link}`}
                ></iframe>
              </div>
            )}
          </>
        )}
      </CardBody>
    </Card>
  )
}

export {LivePage}
