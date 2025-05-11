import moment from 'moment'

const izoFormat = 'YYYY-MM-DD'

export const changeDateFormat = (date: string | null, format?: string) => {
  if (!date || !isValidDate(date)) return '-'
  return moment(date).format(format || izoFormat)
}

export const isValidDate = (d: string) => {
  return !isNaN(new Date(d).getTime())
}

export const getCurrentDate = (format?: string) => {
  return moment().format(format || izoFormat)
}

export const convertDateToTimeago = (date: string) => {
  return moment(date).fromNow()
}

export const diffTwoDatetime = (startDate: string, endDate: string, unit?: string) => {
  const d1 = moment(startDate)
  const d2 = moment(endDate)
  const duration = moment.duration(d2.diff(d1))
  return unit === 'day' ? duration.asDays() : duration.asSeconds()
}

export const isBetweenDate = (date: string, fromDate: string, toDate: string) => {
  return moment(date).isBetween(fromDate, toDate)
}

export const getFirstDayOfYear = (date: any) => {
  return moment(date).startOf('year').format(izoFormat)
}

export const getLastDayOfYear = (date: any) => {
  return moment(date).endOf('year').format(izoFormat)
}

export const getFirstDayOfMonth = (date: any) => {
  return moment(date).startOf('month').format(izoFormat)
}

export const getLastDayOfMonth = (date: any) => {
  return moment(date).endOf('month').format(izoFormat)
}

export const getQuarterRangeDate = (date: any) => {
  // diffrance month with start of quarter
  const diff = (moment(date).month() % 4) * -1
  return {
    from: getFirstDayOfMonth(addMonthToDate(diff, date)),
    to: getLastDayOfMonth(addMonthToDate(diff + 3, date)),
  }
}

export const addDayToDate = (numDays: number, date: any) => {
  return moment(date, izoFormat).add(numDays, 'days').format(izoFormat)
}

export const addMonthToDate = (numMonths: number, date: any) => {
  return moment(date, izoFormat).add(numMonths, 'M').format(izoFormat)
}

export const addYearToDate = (numYears: number, date: any) => {
  return moment(date, izoFormat).add(numYears, 'years').format(izoFormat)
}

export const calculateDateRange = (dateRange: number) => {
  let date = getCurrentDate()
  switch (dateRange) {
    case 1: // Last Month
      date = addMonthToDate(-1, date)
      return {from: getFirstDayOfMonth(date), to: getLastDayOfMonth(date)}
    case 2: // This Month
      return {from: getFirstDayOfMonth(date), to: getLastDayOfMonth(date)}
    case 3: // Last Quarter
      date = addMonthToDate(-4, date)
      return getQuarterRangeDate(date)
    case 4: // This Quarter
      return getQuarterRangeDate(date)
    case 5: // Last Year
      date = addYearToDate(-1, date)
      return {from: getFirstDayOfYear(date), to: getLastDayOfYear(date)}
    case 6: // This Year
      return {from: getFirstDayOfYear(date), to: getLastDayOfYear(date)}
    default:
      // Custom Range
      return null
  }
}

export const convertToJalali = (date: any, hasTime: boolean) => {
  let _date = new Date(date).toLocaleString('fa-IR')
  if (hasTime) {
    if (_date.includes(',')) _date = _date.split(',')[1] + ' ' + _date.split(',')[0]
    else if (_date.includes('،')) _date = _date.split('،')[1] + ' ' + _date.split('،')[0]
    else _date = '-'
    return _date
  }
  if (_date.includes(',')) _date = _date.split(',')[0]
  else if (_date.includes('،')) _date = _date.split('،')[0]
  else _date = '-'
  return _date
}
