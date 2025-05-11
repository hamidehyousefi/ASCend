import useScript from 'app/hooks/useScript'
import {FC} from 'react'

type Props = {
  src: any
}
const AparatVidoeDetails: FC<Props> = ({src}) => {
  useScript(src)

  return <div id='43159405569'></div>
}

export {AparatVidoeDetails}
