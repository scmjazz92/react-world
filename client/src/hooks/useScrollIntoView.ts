import React, { ForwardedRef, RefObject, useCallback } from 'react'

interface Props {
  ref: RefObject<HTMLElement> | ForwardedRef<HTMLElement>
  block: ScrollLogicalPosition
}

const useScrollIntoView = ({ ref, block }: Props) => {
  const scollToBottom = useCallback(() => {
    if (!(ref !== null && typeof ref !== 'function')) return
    setTimeout(() => {
      if (!ref.current) return
      ref.current.scrollIntoView({
        behavior: 'auto',
        block,
        inline: 'nearest',
      })
    }, 50)
  }, [ref])

  return scollToBottom
}

export default useScrollIntoView
