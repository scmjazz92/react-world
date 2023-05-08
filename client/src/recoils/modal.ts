import { atom, DefaultValue, selector } from 'recoil'

interface ModalConfig {
  title: string
  description?: string
  cancelText?: string
  confirmText?: string
  onClose?(): void
  onConfirm?(): void
}

interface ModalState {
  config: ModalConfig | null
  visible: boolean
}

const initialState: ModalState = {
  config: null,
  visible: false,
}

export const modalState = atom<ModalState>({
  key: 'modalState',
  default: initialState,
})

export const modalSelector = selector<ModalState | undefined>({
  key: 'modalSelector',
  get: ({ get }) => {
    return get(modalState)
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue || !newValue) return
    set(modalState, newValue)
  },
})
