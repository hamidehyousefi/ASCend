import {FC} from 'react'

type Props = {
  id: any
  name: string
  value: any
  label?: string
  size?: 'sm' | 'lg'
  checked?: boolean
  disabled?: boolean
  onChange: (e: any) => void
}
export const CheckBoxInput: FC<Props> = ({
  id,
  name,
  value,
  label,
  size,
  checked = false,
  disabled = false,
  onChange,
}) => {
  let sizeClass = ''
  if (size) sizeClass = `form-check-${size}`
  return (
    <div className={`form-check ${sizeClass} form-check-custom form-check-solid`}>
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
        disabled={disabled}
        type='checkbox'
        className='form-check-input'
        data-kt-check='true'
        data-kt-check-target='.widget-9-check'
      />
      {label && (
        <label className='form-check-label' htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  )
}
