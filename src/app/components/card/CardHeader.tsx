import React from 'react'

interface CardHeaderProps {
  title: string
  cardToolbar?: React.ReactNode
}

export const CardHeader: React.FC<CardHeaderProps> = ({title, cardToolbar = null}) => {
  return (
    <div className='card-header border-0 pt-6'>
      <div className='card-title'>{title}</div>
      <div className='card-toolbar'>{cardToolbar}</div>
    </div>
  )
}
