import {FC} from 'react'

type Props = {
  name: string
  label?: string
  color?: string
  size?: string
  value: any
  inline?: boolean
  checked?: boolean
  disabled?: boolean
  className?: string
  onChange: (e: any) => void
}
export const RadioInput: FC<Props> = ({
  name,
  label,
  value,
  onChange,
  inline = true,
  checked,
  color = 'primary',
  size = 'md',
  disabled,
  className = '',
}) => {
  return (
    <div className={`d-flex flex-column align-items-center text-center  ${className}`}>
      <label
        className='form-check-label mb-1 '
        // style={{fontSize: '10px'}}
        htmlFor={label}
      >
        {label}
      </label>
      <input
        className={`form-check-input `}
        type='radio'
        name={name}
        id={label}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  )
}
