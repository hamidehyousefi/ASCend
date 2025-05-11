import {FC} from 'react'
import {NotFound} from './NotFound'

type Props = {
  colSpan: number
}

export const TableNotFound: FC<Props> = ({colSpan}) => {
  return (
    <tbody>
      <tr>
        <td colSpan={colSpan}>
          <NotFound />
        </td>
      </tr>
    </tbody>
  )
}
