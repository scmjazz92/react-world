const validate = {
  username(text: string) {
    return /^[a-z0-9]{6,18}$/.test(text)
  },
  password(text: string) {
    const passwordRules = [/[a-zA-Z]/, /[0-9]/, /[^A-Za-z0-9]/]
    if (text.length < 8 || text.length > 12) return false
    const counter = passwordRules.reduce((acc, cur) => {
      if (cur.test(text)) {
        acc += 1
      }
      return acc
    }, 0)
    return counter > 1
  },
  firstEmptyValue(data: Record<string, string>) {
    const keys = Object.keys(data)
    const result = keys.find((key) => !data[key])
    return result ?? null
  },
  isInteger(value?: number) {
    return Number.isInteger(value)
  },
}

export default validate
