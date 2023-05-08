import { atom, DefaultValue, selectorFamily } from 'recoil'
import { LikeResult } from '../apis/types'

const likeState = atom<Map<number, LikeResult>>({
  key: 'likeState',
  default: new Map(),
})

export const likeItemSelector = selectorFamily<LikeResult | undefined, number>({
  key: 'likeItem',
  get:
    (id: number) =>
    ({ get }) => {
      const items = get(likeState)
      return items.get(id)
    },
  set:
    (id: number) =>
    ({ get, set }, newValue) => {
      if (newValue instanceof DefaultValue || !newValue) return
      const newItem = new Map([...get(likeState)])
      newItem.set(id, newValue)
      set(likeState, newItem)
    },
})
