import {FC} from 'react'

type Props = {
  children?: any
}

export const CardFooter: FC<Props> = ({children}) => {
  return <div className='card-footer'>{children}</div>
}
