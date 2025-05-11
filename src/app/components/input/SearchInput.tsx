import {FC} from 'react'
import {KTSVG} from '../../../_metronic/helpers'

type Props = {
  onSearch: (value: string) => void
  timeout?: number
  placeholder?: string
  className?: string
  fullWidth?: boolean
}

export const SearchInput: FC<Props> = ({
  onSearch,
  timeout = 1000,
  placeholder = '',
  className = '',
  fullWidth,
}) => {
  let timer: any = null
  const handleChange = (e: any) => {
    clearTimeout(timer)
    let value = e.target.value
    timer = setTimeout(() => onSearch(value), timeout)
  }

  return (
    <div className={`d-flex align-items-center position-relative my-1 ${className}`}>
      <KTSVG
        path='/media/icons/duotune/general/gen021.svg'
        className='svg-icon-1 position-absolute ms-3'
      />
      <input
        type='text'
        className={`form-control form-control-solid ps-12 ${fullWidth ? '' : 'w-250px'}`}
        placeholder={`Search ${placeholder}`}
        onChange={handleChange}
      />
    </div>
  )
}
