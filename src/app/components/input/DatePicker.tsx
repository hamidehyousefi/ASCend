import {FC} from 'react'
import {FormHelperText, TextField} from '@mui/material'
import AdapterJalali from '@date-io/date-fns-jalali'
import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
// import moment from 'moment'

type Props = {
  name: string
  value: Date | null | string
  label: string
  margin?: 'dense' | 'normal' | 'none'
  readOnly?: boolean
  error?: boolean
  helperText?: any
  onChange: (e: any) => void
}

class CustomString extends String {
  charAt(_: number): string {
    return this.valueOf()
  }
}
const weekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']
const customWeekDays = weekDays.map((day) => new CustomString(day) as string)

export class CustomAdapter extends AdapterJalali {
  getWeekdays = (): string[] => customWeekDays
}

export const DatePickerJalali: FC<Props> = ({
  name,
  label,
  value,
  margin = 'dense',
  readOnly = false,
  error = false,
  helperText,
  onChange,
}) => {
  // set first day of week in dow
  //moment.updateLocale('en', {week: {dow: 0, doy: 1}})
  //add moment={moment} props to LocalizationProvider component
  return (
    <>
      <LocalizationProvider dateAdapter={CustomAdapter}>
        <DatePicker
          mask='____/__/__'
          value={value}
          inputFormat='yyyy/MM/dd'
          label={label}
          onChange={onChange}
          readOnly={readOnly}
          renderInput={(params) => (
            <TextField margin={margin} fullWidth name={name} {...params} error={error} />
          )}
        />
      </LocalizationProvider>
      {error && <FormHelperText className='text-danger'>{helperText}</FormHelperText>}
    </>
  )
}
