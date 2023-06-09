const validate = {
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
}

export default validate
