import { css } from '@emotion/react'
import React, { useCallback } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import colors from '../../lib/colors'
import {
  bottomSheetModalSelector,
  bottomSheetModalState,
} from '../../recoils/bottomSheetModal'

const BottomSheetModal = () => {
  const modal = useRecoilValue(bottomSheetModalSelector)
  const onReset = useResetRecoilState(bottomSheetModalState)

  const onClose = useCallback(() => {
    modal?.config?.onClose?.()
    onReset()
  }, [modal])

  if (!modal?.config) return null

  const { items } = modal.config

  return modal.visible ? (
    <div css={overlay} onClick={onClose}>
      <div onClick={(event) => event.stopPropagation()} css={content}>
        {items.map((item) => (
          <button
            key={item.text}
            onClick={() => {
              item.onClick()
              onClose()
            }}
          >
            {item.text}
          </button>
        ))}
      </div>
    </div>
  ) : null
}

const overlay = css`
  display: flex;
  align-items: end;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  animation: background 0.3s ease forwards;

  @keyframes background {
    0% {
      background: 0;
    }

    100% {
      background: rgba(0, 0, 0, 0.7);
    }
  }
`

const content = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  transform: translateY(100%);
  animation: up 0.3s ease forwards;

  & button {
    display: block;
    padding: 20px;
    background: ${colors.white};
    font-size: 16px;
    text-align: left;

    &:first-of-type {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
  }

  @keyframes up {
    0% {
      transform: translateY(100%);
    }

    100% {
      transform: translateY(0);
    }
  }
`

export default BottomSheetModal
