import {Autocomplete, CircularProgress, IconButton, TextField} from '@mui/material'
import {FC} from 'react'

type Props = {
  name: string
  label?: string
  placeholder?: string
  helperText?: string
  options: any
  getOptionLabel?: any
  isOptionEqualToValue?: any
  value?: any
  defaultValue?: any
  error?: boolean | undefined
  className?: string
  size?: 'small' | 'medium'
  margin?: 'none' | 'dense' | 'normal'
  loading?: boolean
  disabled?: boolean
  readOnly?: boolean
  clearable?: boolean
  multiple?: boolean
  open?: boolean
  onOpen?: () => void
  onClose?: () => void
  onChange: (e: any, item: any) => void
}
export const SelectInput: FC<Props> = (props) => {
  const {
    name,
    label,
    placeholder,
    options,
    value,
    defaultValue,
    helperText,
    error,
    className,
    size = 'medium',
    margin = 'dense',
    loading = false,
    disabled = false,
    readOnly = false,
    clearable = false,
    multiple = false,
    getOptionLabel,
    isOptionEqualToValue,
    open,
    onOpen,
    onClose,
    onChange,
  } = props
  return (
    <Autocomplete
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      value={value}
      options={options}
      onChange={onChange}
      blurOnSelect={true}
      loading={loading}
      disableClearable={!clearable}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      popupIcon={
        <IconButton color='primary' style={{padding: 5}} component='span'>
          <i className='fas fa-caret-down icon-lg'></i>
        </IconButton>
      }
      readOnly={readOnly}
      multiple={multiple}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          label={label}
          placeholder={placeholder}
          size={size}
          margin={margin}
          disabled={disabled}
          className={className}
          helperText={helperText}
          error={error}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress
                    style={{marginRight: size === 'small' ? 25 : 0}}
                    color='inherit'
                    size={20}
                  />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  )
}
