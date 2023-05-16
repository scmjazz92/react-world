import { css } from '@emotion/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useResetRecoilState, useSetRecoilState } from 'recoil'
import useUnRegister from '../../hooks/apis/auth/useUnRegister'
import { mediaQuery } from '../../lib/mediaQuery'
import styles from '../../lib/styles'
import { modalSelector } from '../../recoils/modal'
import { userState } from '../../recoils/user'
import Button from '../@shared/Button'

const UnRegisterView = () => {
  const navigate = useNavigate()
  const modal = useSetRecoilState(modalSelector)
  const { mutate: onUnRegister } = useUnRegister()
  const onReset = useResetRecoilState(userState)

  const handleUnregisterModal = () => {
    modal({
      config: {
        title: '회원 탈퇴',
        description: '정말로 탈퇴하시겠습니까?',
        confirmText: '탈퇴',
        cancelText: '취소',
        onConfirm() {
          onUnRegister(undefined, {
            onSuccess() {
              navigate('/')
              setTimeout(() => onReset(), 100)
            },
          })
        },
      },
      visible: true,
    })
  }

  return (
    <div css={container}>
      <p css={description}>
        회원 탈퇴 시 모든 내 스토리와 댓글은 삭제됩니다.
        <br />
        삭제된 후에는 복구가 되지 않으니 신중하게 탈퇴하시기를 부탁드립니다.
      </p>
      <Button onClick={handleUnregisterModal}>회원 탈퇴</Button>
    </div>
  )
}

const container = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  ${styles.padding}

  ${mediaQuery.tablet} {
    width: 600px;
    margin: 0 auto;
    justify-content: center;
  }
`

const description = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  font-size: 14px;
  line-height: 1.6;
  font-weight: bold;

  ${mediaQuery.tablet} {
    flex: 0;
    margin-bottom: 20px;
  }
`

export default UnRegisterView
