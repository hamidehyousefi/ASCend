import {FC} from 'react'
import {toAbsoluteUrl} from '_metronic/helpers'

type Props = {
  title?: string
  color?: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'dark'
  center?: boolean
}

export const Loading: FC<Props> = ({title, color, center}) => {
  return (
    <div
      className={`py-4 ${center && 'd-flex flex-column align-items-center justify-content-center'}`}
    >
      {/* <div className={`spinner-border text-${color || 'primary'}`} role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div> */}
      <img
        alt='Loading'
        src={toAbsoluteUrl('/media/logos/loading.svg')}
        className='h-150px m-0 p-0'
      />
      <div className='fw-bold text-muted'>{title || ''}</div>
    </div>
  )
}
