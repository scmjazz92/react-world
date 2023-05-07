import React, { useState } from 'react'
import validate from '../lib/validate'

type errorMessages = Record<string, string>

const useEmptyValidator = (errorMessages: errorMessages) => {
  const [error, setError] = useState('')

  const validator = (value: Record<string, string>) => {
    const errorKey = validate.firstEmptyValue(value)

    if (errorKey) {
      setError(errorMessages[errorKey])
      return false
    }

    return true
  }
  return { error, validator }
}

export default useEmptyValidator
