import React from 'react'

interface SwitchInputProps {
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  checked: boolean
  label: string
}

export const SwitchInput: React.FC<SwitchInputProps> = ({name, onChange, checked, label}) => {
  return (
    <div className='form-check form-switch form-check-custom form-check-solid'>
      <input
        className='form-check-input'
        type='checkbox'
        checked={checked}
        id={name}
        onChange={onChange}
      />
      <label className='form-check-label' htmlFor={name}>
        {label}
      </label>
    </div>
  )
}
