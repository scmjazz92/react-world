import { css } from '@emotion/react'
import React, { useCallback } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import colors from '../../lib/colors'
import styles from '../../lib/styles'
import { modalSelector, modalState } from '../../recoils/modal'
import Button from './Button'

const Modal = () => {
  const modal = useRecoilValue(modalSelector)
  const onReset = useResetRecoilState(modalState)

  const onClose = useCallback(() => {
    modal?.config?.onClose?.()
    onReset()
  }, [modal])

  const onConfirm = useCallback(() => {
    modal?.config?.onConfirm?.()
    onReset()
  }, [modal])

  if (!modal?.config) return null

  const { title, cancelText, confirmText, description } = modal.config

  return modal?.visible ? (
    <div css={overlay} onClick={onClose}>
      <div css={content} onClick={(event) => event.stopPropagation()}>
        {title && <strong className="title">{title}</strong>}
        {description && <p className="description">{description}</p>}
        <div className="buttons">
          {cancelText && (
            <Button onClick={onClose} className="close">
              {cancelText || '취소'}
            </Button>
          )}
          {confirmText && (
            <Button onClick={onConfirm} className="confirm">
              {confirmText || '확인'}
            </Button>
          )}
        </div>
      </div>
    </div>
  ) : null
}

const overlay = css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`

const content = css`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 30px);
  max-width: 380px;
  background: ${colors.white};
  border-radius: 6px;
  ${styles.padding}

  .title {
    font-size: 20px;
    padding-bottom: 20px;
  }

  .buttons {
    padding-top: 30px;
    display: flex;
    margin-left: auto;

    .close {
      margin-right: 8px;
      background: ${colors.blue50};
    }

    & button {
      width: auto;
      padding-left: 20px;
      padding-right: 20px;
    }
  }
`

export default Modal
