import {FC} from 'react'
import {KTSVG} from '_metronic/helpers'

type Props = {
  title: string
  onClose: () => void
}

export const DialogHeader: FC<Props> = ({title, onClose}) => {
  return (
    <div className='modal-header'>
      <h2 className='fw-bolder'>{title}</h2>
      <div
        className='btn btn-icon btn-sm btn-active-icon-primary'
        data-kt-users-modal-action='close'
        onClick={onClose}
      >
        <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
      </div>
    </div>
  )
}
