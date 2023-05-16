type Func = (...args: any[]) => any

const throttle = (func: Func, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | null

  return function (this: any, ...args: any[]) {
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        func.apply(this, args)
        timeoutId = null
      }, delay)
    }
  }
}

export default throttle
