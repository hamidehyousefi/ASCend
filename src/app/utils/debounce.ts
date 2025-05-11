import {useEffect, useState} from 'react'

export const useDebounce: any = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(null)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debouncedValue
}
