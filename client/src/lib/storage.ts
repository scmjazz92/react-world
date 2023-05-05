export const storageKeys = {
  access_token: 'access_token',
  refresh_token: 'refresh_token',
} as const

type StorageKeys = keyof typeof storageKeys

const storage = {
  set(key: StorageKeys, value: any) {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      localStorage.setItem(key, value)
    }
  },
  get(key: StorageKeys) {
    const value = localStorage.getItem(key)
    if (!value) return null
    return value
  },
  remove(key: StorageKeys) {
    localStorage.removeItem(key)
  },
}

export default storage
