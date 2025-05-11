import {FC, useEffect} from 'react'

import {KTSVG} from '../../_metronic/helpers'
import {MenuComponent} from '../../_metronic/assets/ts/components'

export interface MenuItem {
  id: number
  title: string
  icon?: string
}
type Props = {
  menuItems: MenuItem[]
  btnClasses?: string
  btnLabel?: string
  menuWidth?: number
  onClick: (menuItem: MenuItem) => void
}

export const DropDownMenu: FC<Props> = ({
  menuItems,
  btnClasses = '',
  btnLabel = '',
  menuWidth = 125,
  onClick,
}) => {
  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  return (
    <>
      <button
        className={`btn btn-light-primary btn-active-primary ${btnClasses}`}
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        {btnLabel}
        <KTSVG
          path='/media/icons/duotune/arrows/arr072.svg'
          className={`svg-icon-5 m-0 ${btnLabel && 'ms-2'}`}
        />
      </button>
      <div
        className={`menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-${menuWidth}px py-4`}
        data-kt-menu='true'
      >
        {menuItems.map((item) => (
          <div className='menu-item px-3' key={item.id}>
            <a className='menu-link px-3' onClick={() => onClick(item)}>
              {item.icon && <i className={`bi bi-${item.icon} fs-2 me-2`} />}
              {item.title}
            </a>
          </div>
        ))}
      </div>
    </>
  )
}
