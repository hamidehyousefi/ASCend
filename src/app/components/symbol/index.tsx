import React from 'react'
import {Color} from 'react-bootstrap/esm/types'

interface ISymbol {
  color?: Color
  type?: 'label' | 'img'
  size?: number
  img?: string
  children?: any
}

export const Symbol: React.FC<ISymbol> = ({
  color = 'primary',
  type = 'label',
  size = 50,
  img = '',
  children,
}) => {
  if (type === 'label') {
    return (
      <div className={`symbol symbol-${size}px`}>
        <div className={`symbol-label fs-2 fw-semibold text-${color}`}>{children}</div>
      </div>
    )
  }
  return (
    <div className={`symbol symbol-${size}px symbol-2by3`}>
      <img src={img} alt='img' />
    </div>
  )
}
