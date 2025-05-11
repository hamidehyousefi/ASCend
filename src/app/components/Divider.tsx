import {FC} from 'react'
import clsx from 'clsx'

type Props = {
  className?: string
  style?: 'dotted' | 'dashed'
  size?: 2 | 3 | 4 | 5
  color?:
    | 'primary'
    | 'secondary'
    | 'light'
    | 'white'
    | 'dark'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
  children?: any
}

export const Divider: FC<Props> = ({className, style, size, color, children}) => {
  return (
    <div
      className={clsx(
        'separator',
        className && className,
        style && `separator-${style}`,
        size && `border-${size}`,
        color && `border-${color}`,
        children && 'separator-content'
      )}
    >
      {children}
    </div>
  )
}
