import React from 'react'

export interface IColumn {
  id: number
  title: string | React.ReactChild | React.ReactChildren
  minWidth: number
  align: 'center' | 'right' | 'left' | 'start' | 'end'
  fontWeight: 'bold' | 'bolder' | 'semibold' | 'normal' | 'light' | 'lighter' | 'italic' | 'normal'
}

interface TheadProps {
  columns: any
}

const Thead: React.FC<TheadProps> = ({columns}) => {
  return (
    <thead>
      <tr className='fw-bolder text-muted'>
        {columns.map((column: any) => (
          <th key={column.id} className={`min-w-${column.minWidth}px text-${column.align} px-0`}>
            {column.title}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default Thead
