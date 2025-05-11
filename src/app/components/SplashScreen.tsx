import {FC} from 'react'
import {toAbsoluteUrl} from '_metronic/helpers'

type Props = {
  title?: string
}
export const SplashScreen: FC<Props> = ({title}) => (
  <div className='splash-screen2'>
    {/* <img alt='Logo' src={toAbsoluteUrl('/media/logos/logo_dark.png')} width={100} height={150} /> */}
    {title && <h1 className='d-flex text-dark fw-bolder fs-3 align-items-center my-1'>{title}</h1>}
    <img
      alt='Loading'
      src={toAbsoluteUrl('/media/logos/loading.svg')}
      className='h-150px m-0 p-0'
    />
  </div>
)
