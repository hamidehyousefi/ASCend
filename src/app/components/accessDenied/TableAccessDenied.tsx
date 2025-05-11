import {FC} from 'react'
import {AccessDenied} from './AccessDenied'

type Props = {
  colSpan: number
}

export const TableAccessDenied: FC<Props> = ({colSpan}) => {
  return (
    <tbody>
      <tr>
        <td colSpan={colSpan}>
          <AccessDenied />
        </td>
      </tr>
    </tbody>
  )
}
