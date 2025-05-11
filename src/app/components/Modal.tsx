import React from 'react'

export interface ModalProps {
  open: boolean
  modalTitle: string
  modalFooter?: any
  fullScreen?: boolean
  toolbar: React.ReactNode
  children?: any
}

export const Modal: React.FC<ModalProps> = ({
  open,
  modalTitle,
  children,
  modalFooter = '',
  fullScreen = false,
  toolbar = '',
}) => {
  return (
    <div
      className={`modal bg-white fade ${open && 'show'}`}
      style={{display: open ? 'block' : 'none'}}
      tabIndex={-1}
    >
      <div className={`modal-dialog ${fullScreen && 'modal-fullscreen'}`}>
        <div className='modal-content shadow-none'>
          <div className='modal-header'>
            <h5 className='modal-title'>{modalTitle}</h5>
            {toolbar}
          </div>
          <div className='modal-body'>{children}</div>
          {modalFooter ? <div className='modal-footer'>{modalFooter}</div> : ''}
        </div>
      </div>
    </div>
  )
}
