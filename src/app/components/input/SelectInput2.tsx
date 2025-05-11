import {FC} from 'react'
import {TextField, MenuItem} from '@mui/material'
// import {SelectChangeEvent} from '@mui/material/Select'

interface OptionType {
  label: string
  value: any
}
type Props = {
  name: string
  label?: string
  value?: any
  options: OptionType[]
  variant?: 'standard' | 'filled' | 'outlined'
  size?: 'small' | 'medium'
  margin?: 'dense' | 'normal'
  placeholder?: string
  error?: boolean
  required?: boolean
  helperText?: string
  onChange: (e: any) => void
}
export const SelectInput2: FC<Props> = ({
  name,
  label = '',
  value = '',
  options,
  variant = 'outlined',
  size = 'medium',
  margin = 'dense',
  placeholder,
  error,
  required,
  helperText,
  onChange,
}) => {
  return (
    <TextField
      select
      fullWidth
      name={name}
      label={label}
      value={value}
      variant={variant}
      size={size}
      margin={margin}
      placeholder={placeholder}
      error={error}
      required={required}
      helperText={helperText}
      onChange={onChange}
    >
      {options.map((option: OptionType) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  )
}
