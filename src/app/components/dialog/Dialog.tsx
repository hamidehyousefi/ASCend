import {FC, useEffect} from 'react'

type Props = {
  screen?:
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | 'full'
    | 'full-sm'
    | 'full-md'
    | 'full-lg'
    | 'full-xl'
    | 'full-xxl'
  center?: boolean
  scrollable?: boolean
  zIndex?: number
  children?: any
}

export const Dialog: FC<Props> = ({
  screen,
  center = true,
  scrollable = true,
  children,
  zIndex = 1055,
}) => {
  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [])
  const getScreenClass = () => {
    switch (screen) {
      case 'sm':
      case 'lg':
      case 'xl':
        return `modal-${screen}`
      case 'full':
        return 'modal-fullscreen'
      case 'full-sm':
      case 'full-md':
      case 'full-lg':
      case 'full-xl':
      case 'full-xxl':
        return `modal-fullscreen-${screen.slice(5)}-down`
      default:
        return 'mw-500px'
    }
  }

  return (
    <>
      <div
        className='modal fade show d-block'
        // data-bs-backdrop='static'
        // data-bs-keyboard='false'
        tabIndex={-1}
        role='dialog'
        aria-modal='true'
        style={{zIndex}}
      >
        <div
          className={`modal-dialog ${getScreenClass()} ${center && 'modal-dialog-centered'} ${
            scrollable && 'modal-dialog-scrollable'
          }`}
        >
          <div className='modal-content'>{children}</div>
        </div>
      </div>
      <div className='modal-backdrop fade show'></div>
    </>
  )
}
