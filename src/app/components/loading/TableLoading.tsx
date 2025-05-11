import {FC} from 'react'
import {Loading} from './Loading'

type Props = {
  colSpan: number
  title?: string
}

export const TableLoading: FC<Props> = ({colSpan, title}) => {
  return (
    <tbody>
      <tr>
        <td colSpan={colSpan}>
          <Loading title={title} center />
        </td>
      </tr>
    </tbody>
  )
}
