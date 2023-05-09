import { atom, DefaultValue, selector } from 'recoil'

interface BottomSheetModalConfig {
  items: {
    text: string
    onClick(): void
  }[]
  onClose?(): void
}

interface BottomSheetModalState {
  config: BottomSheetModalConfig | null
  visible: boolean
}

const initialState: BottomSheetModalState = {
  config: null,
  visible: false,
}

export const bottomSheetModalState = atom<BottomSheetModalState>({
  key: 'bottomSheetModalState',
  default: initialState,
})

export const bottomSheetModalSelector = selector<
  BottomSheetModalState | undefined
>({
  key: 'bottomSheetModalSelector',
  get: ({ get }) => {
    return get(bottomSheetModalState)
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue || !newValue) return
    set(bottomSheetModalState, newValue)
  },
})
