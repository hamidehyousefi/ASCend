import React from 'react'

interface BadgeProps {
  color:
    | 'white'
    | 'primary'
    | 'light'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'dark'
    | 'light-primary'
    | 'light-success'
    | 'light-info'
    | 'light-warning'
    | 'light-danger'
    | 'light-dark'
  children?: any
}

export const Badge: React.FC<BadgeProps> = ({color, children}) => {
  return <span className={`badge badge-${color}`}>{children}</span>
}
