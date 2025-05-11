import {FC} from 'react'

type Props = {
  type:
    | 'edit'
    | 'delete'
    | 'archive'
    | 'view'
    | 'download'
    | 'config'
    | 'hide'
    | 'pdf'
    | 'excel'
    | 'print'
    | 'archive'
    | 'restore'
    | 'users'
    | 'lock'
    | 'signature'
  tooltip?: string
  size?: string
  className?: string
  disabled?: boolean
  onClick: () => void
}

export const IconButton: FC<Props> = ({
  type,
  tooltip,
  size = 'sm',
  className = '',
  disabled = false,
  onClick,
}) => {
  let icon = '',
    color = ''
  switch (type) {
    case 'edit':
      tooltip = tooltip || 'Edit'
      color = 'light-primary'
      icon = 'las la-edit'
      break
    case 'lock':
      tooltip = tooltip || 'Lock'
      color = 'light-info'
      icon = 'las la-lock'
      break
    case 'signature':
      tooltip = tooltip || 'Signature'
      color = 'light-success'
      icon = 'las la-signature'
      break
    case 'delete':
      tooltip = tooltip || 'Delete'
      color = 'light-danger'
      icon = 'la la-trash'
      break
    case 'archive':
      tooltip = tooltip || 'Archive'
      color = 'light-warning'
      icon = 'bi bi-archive-fill'
      break
    case 'restore':
      tooltip = tooltip || 'Restore'
      color = 'light-success'
      icon = 'las la-trash-restore-alt'
      break
    case 'view':
      tooltip = tooltip || 'View'
      color = 'light-info'
      icon = 'bi bi-eye-fill'
      break
    case 'download':
      tooltip = tooltip || 'Download'
      color = 'light-primary'
      icon = 'bi bi-download'
      break
    case 'config':
      tooltip = tooltip || 'Config'
      color = 'light-primary'
      icon = 'bi bi-gear-fill'
      break
    case 'hide':
      tooltip = tooltip || 'Hide'
      color = 'light-info'
      icon = 'bi bi-eye-slash-fill'
      break
    case 'pdf':
      tooltip = tooltip || 'PDF'
      color = 'light-danger'
      icon = 'bi bi-filetype-pdf'
      break
    case 'excel':
      tooltip = tooltip || 'Excel'
      color = 'light-success'
      icon = 'bi bi-file-earmark-excel-fill'
      break
    case 'print':
      tooltip = tooltip || 'Print'
      color = 'light-primary'
      icon = 'bi bi-printer-fill'
      break
    case 'users':
      tooltip = tooltip || 'Employees'
      color = 'light-primary'
      icon = 'bi bi-people-fill'
      break
    default:
  }

  return (
    <button
      type='button'
      title={tooltip}
      className={`btn btn-icon btn-${size} btn-${color} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      <i className={`${icon} fs-2`} />
    </button>
  )
}
