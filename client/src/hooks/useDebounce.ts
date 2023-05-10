import { useState, useEffect } from 'react'

interface UseDeBounceConfig {
  value: string
  delay?: number
}

const useDebounce = ({ value, delay = 400 }: UseDeBounceConfig) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debounceValue
}

export default useDebounce
