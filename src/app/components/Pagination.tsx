import {FC} from 'react'
import clsx from 'clsx'

type Props = {
  currentPage: number
  pageSize?: number
  totalRecords: number
  onChange: (value: number) => void
}
type paginationItemType = {
  value: number
  title: string
  active: boolean
  label: number | string | React.ReactNode
}

export const Pagination: FC<Props> = ({currentPage, pageSize = 10, totalRecords, onChange}) => {
  const totalPages = Math.ceil(totalRecords / pageSize)
  let paginationItems: paginationItemType[] = []

  const addItem = (value: number, title: string, active: boolean, icon?: string) => {
    paginationItems.push({
      value,
      title,
      active,
      label: icon ? <i className={`fas fa-${icon}`} /> : value,
    })
  }

  if (totalPages > 1 && currentPage <= totalPages) {
    //item: go to first page
    if (currentPage > 1) addItem(1, 'اولین', false, 'angle-double-right')
    //item: go to previous page
    if (currentPage > 1) addItem(currentPage - 1, 'قبلی', false, 'angle-right')
    //middle items
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i > 0 && i <= totalPages) addItem(i, '', i === currentPage)
    }
    //item: go to next page
    if (currentPage < totalPages) addItem(currentPage + 1, 'بعدی', false, 'angle-left')
    //item: go to last page
    addItem(totalPages, 'آخرین', false, 'angle-double-left')

    return (
      <div className='row'>
        <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'>
          <div id='kt_table_users_paginate'>
            <ul className='pagination pagination-outline'>
              {paginationItems.map((item, index) => (
                <li
                  key={index}
                  title={item.title}
                  className={clsx('page-item', {active: item.active})}
                  onClick={() => onChange(item.value)}
                >
                  <a
                    className={clsx('page-link cursor-pointer', {'text-hover-white': item.active})}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
          تعداد کل: {totalRecords}
        </div>
      </div>
    )
  } else return <></>
}
