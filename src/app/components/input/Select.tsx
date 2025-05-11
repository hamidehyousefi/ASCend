import {FormHelperText} from '@mui/material'
import ReactSelect, {MultiValue, SingleValue} from 'react-select'

export interface ISelectOption {
  label: string
  value: any
}

interface SelectProps {
  name: string
  value: MultiValue<ISelectOption> | SingleValue<ISelectOption> | null
  options: ISelectOption[]
  onChange: (newValue: MultiValue<ISelectOption> | SingleValue<ISelectOption> | null) => void
  isMulti?: boolean
  autoFocus?: boolean
  className?: string
  isLoading?: boolean
  isSearchable?: boolean
  isClearable?: boolean
  placeholder?: string
  size?: 'small' | 'medium'
  error?: string
  disabled?: boolean
}

export const Select: React.FC<SelectProps> = ({
  name,
  value,
  onChange,
  isMulti = false,
  options,
  autoFocus = false,
  className = '',
  isLoading = false,
  isSearchable = true,
  isClearable = true,
  placeholder = '',
  size = 'small',
  error = '',
  disabled = false,
}) => {
  const height: number = size === 'small' ? 42 : 52
  return (
    <>
      <ReactSelect
        name={name}
        value={value}
        onChange={onChange}
        isMulti={isMulti}
        options={options}
        autoFocus={autoFocus}
        className={className}
        isLoading={isLoading}
        isSearchable={isSearchable}
        isClearable={isClearable}
        placeholder={placeholder}
        isDisabled={disabled}
        styles={{
          input: (provided: any) => ({
            ...provided,
            minHeight: height,
          }),
          control: (provided: any) => ({
            ...provided,
            borderColor: error ? '#d32f2f' : '#cccccc',
          }),
          menu: (provided: any) => ({
            ...provided,
            zIndex: 3,
          }),
        }}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </>
  )
}
