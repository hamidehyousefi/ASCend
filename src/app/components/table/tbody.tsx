import {Grow} from '@mui/material'
import React from 'react'
import {Loading} from '../loading/Loading'
import {IColumn} from './thead'

export interface ITableRow {
  id: number
  title: string | React.ReactNode
}

export interface ITbody {
  data: any[]
  columns: IColumn[]
  loading: boolean
}

const Tbody: React.FC<ITbody> = ({data, columns, loading}) => {
  return (
    <tbody>
      {(loading && (
        <tr>
          <td colSpan={columns.length}>
            <Loading center />
          </td>
        </tr>
      )) ||
        data.map((row, index) => {
          return (
            <Grow key={index} in={true} timeout={200 * (index + 2)}>
              <tr>
                {Object.keys(row).map((key, index) => (
                  <td
                    key={key}
                    // align={columns[index].align}
                    className={`fw-${columns[index].fontWeight} text-${columns[index].align} px-0`}
                  >
                    {row[key]}
                  </td>
                ))}
              </tr>
            </Grow>
          )
        })}
      {loading === false && data.length === 0 ? (
        <tr>
          <td colSpan={columns.length}>
            <div className='text-dark text-center'>
              <h3>اطلاعاتی وجود ندارد</h3>
            </div>
          </td>
        </tr>
      ) : null}
    </tbody>
  )
}

export default Tbody
