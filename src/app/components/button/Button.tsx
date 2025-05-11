import {FC} from 'react'
import clsx from 'clsx'

type Props = {
  title: any
  type?: string
  style?: 'outline' | 'light' | ''
  size?: 'lg' | 'sm' | ''
  className?: string
  icon?: string
  disabled?: boolean
  loading?: boolean
  hoverEffect?: 'rise' | 'scale' | 'rotate-start' | 'rotate-end'
  onClick?: () => void
  color?:
    | 'white'
    | 'primary'
    | 'light'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'dark'
  fullWidth?: boolean
}

export const Button: FC<Props> = ({
  title,
  type,
  size = 'sm',
  style,
  className = '',
  icon,
  disabled = false,
  loading = false,
  hoverEffect,
  onClick,
  color = 'primary',
  fullWidth = false,
}) => {
  switch (style) {
    case 'outline':
      className += ` btn-outline btn-outline-dashed btn-outline-${color} btn-active-light-${color} btn-icon-${color}`
      break
    case 'light':
      className += ` btn-light-${color}`
      break
    default:
      className += ` btn-${color}`
  }

  const renderTitle = () => {
    if (loading)
      return (
        <>
          <span className='indicator-label'>{title}</span>
          <span className='indicator-progress'>
            <span className='spinner-border spinner-border-sm align-middle me-2'></span>
            {title}
          </span>
        </>
      )
    return title
  }
  return (
    <button
      type={type ? 'submit' : 'button'}
      className={clsx(
        'btn',
        className && className,
        size && `btn-${size}`,
        hoverEffect && `btn-hover-${hoverEffect}`,
        fullWidth && `w-100`
      )}
      data-kt-indicator={loading && 'on'}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {icon && <i className={`${icon} fs-2`} />}
      {renderTitle()}
    </button>
  )
}
