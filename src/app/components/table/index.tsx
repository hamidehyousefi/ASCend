import React from 'react'
import {TableAccessDenied} from '../accessDenied/TableAccessDenied'
import Tbody from './tbody'
import Thead, {IColumn} from './thead'

interface TableProps {
  columns: IColumn[]
  data: any[]
  loading: boolean
  hasPermission?: boolean
  className?: string
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  loading,
  className = '',
  hasPermission = true,
}) => {
  return (
    <div className='table-responsive'>
      {/* begin::Table */}
      <table
        className={`table ${className} table-row-bordered table-row-gray-300 align-middle gs-0 gy-3`}
        style={{minWidth: 400}}
      >
        <Thead columns={columns} />
        {/* begin::Table body */}
        {hasPermission ? (
          <Tbody data={data} columns={columns} loading={loading} />
        ) : (
          <TableAccessDenied colSpan={columns.length} />
        )}
        {/* end::Table body */}
      </table>
      {/* end::Table */}
    </div>
  )
}
