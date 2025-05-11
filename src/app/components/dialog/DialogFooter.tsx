import {FC} from 'react'

type Props = {
  children?: any
}
export const DialogFooter: FC<Props> = ({children}) => {
  return <div className='modal-footer'>{children}</div>
}
