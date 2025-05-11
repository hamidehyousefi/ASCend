import {FC} from 'react'

type Props = {
  children?: any
}
export const DialogBody: FC<Props> = ({children}) => {
  return <div className='modal-body scroll-y '>{children}</div>
}
