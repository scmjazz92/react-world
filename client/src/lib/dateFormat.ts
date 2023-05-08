type Locales = 'ko-KR' | 'en-UK' | 'en-Us' | 'ja-JP'

interface UseDateTimeFormatProps {
  locales?: Locales
  options?: Intl.DateTimeFormatOptions
  date: Date
}

export const dateFormat = ({
  locales = 'ko-KR',
  options = {},
  date,
}: UseDateTimeFormatProps) => {
  return new Intl.DateTimeFormat(locales, {
    ...options,
  }).format(new Date(date))
}

export const midnightCheck = (date: Date) => {
  return (
    new Date(date).toLocaleDateString() <
    new Date(Date.now()).toLocaleDateString()
  )
}
