import React, {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

type Mode = 'all' | 'submit' | 'change' | 'blur'

type FormConfig = {
  validate?: (text: string) => boolean
  errorMessage?: string
}

interface InputPropsConfig<T> {
  onChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
  onBlur(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void
  name: T
}

interface Props<T extends string> {
  mode?: Mode
  form: Record<T, FormConfig>
}

const useForm = <T extends string>({ mode = 'all', form }: Props<T>) => {
  const [errors, setErrors] = useState<
    Partial<Record<T, string | null | undefined>>
  >({})

  const [disabled, setDisabled] = useState(false)
  const errorRef = useRef(errors)

  const setError = useCallback(
    (key: T, errorMessage: string | null | undefined) => {
      if (errorRef.current[key] === errorMessage) return
      errorRef.current[key] = errorMessage
      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: errorMessage,
      }))
    },
    [errorRef.current],
  )

  const validator = useCallback(
    (key: T, value: string) => {
      const formConfig = form[key]
      const isValid = formConfig.validate?.(value)
      if (isValid) {
        setError(key, null)
      } else {
        setError(key, formConfig.errorMessage)
      }
    },
    [form],
  )

  const inputProps = useMemo(() => {
    const props = {} as Partial<Record<T, InputPropsConfig<T>>>
    const keys = Object.keys(form) as T[]

    keys.forEach((key) => {
      props[key] = {
        onChange(event) {
          const modes: Mode[] = ['all', 'change']
          if (!modes.includes(mode)) return
          validator(key, event.target.value)
        },
        onBlur(event) {
          const modes: Mode[] = ['all', 'blur']
          if (!modes.includes(mode)) return
          validator(key, event.target.value)
        },
        name: key,
      }
    })

    return props
  }, [form, mode])

  const handleSubmit = useCallback(
    (
      onSubmit: (
        value: Record<T, string>,
        form: FormEvent & {
          target: HTMLFormElement
          currentTarget: HTMLFormElement
        },
      ) => void,
    ) => {
      return (
        event: FormEvent & {
          target: HTMLFormElement
          currentTarget: HTMLFormElement
        },
      ) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const formFromEntries = Object.fromEntries(formData) as Record<
          T,
          string
        >
        const entries = Object.entries<string>(formFromEntries) as [T, string][]

        const isValid = entries.reduce((acc, [key, value]) => {
          const { validate, errorMessage } = form[key]
          if (validate?.(value) === false) {
            setError(key, errorMessage)
            return false
          }
          setError(key, null)
          return acc
        }, true)

        if (!isValid) return
        return onSubmit(formFromEntries, event)
      }
    },
    [form],
  )

  useEffect(() => {
    const keys = Object.keys(form) as T[]
    const errorDisabled = keys.some((key) => errors[key] !== null)

    if (errorDisabled) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [form, errors])

  return {
    inputProps,
    errors,
    disabled,
    setErrors,
    handleSubmit,
  }
}

export default useForm
