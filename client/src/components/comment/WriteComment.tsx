import { css } from '@emotion/react'
import React, { ChangeEvent, FocusEvent, useState } from 'react'
import { useRecoilValue } from 'recoil'
import useOpenLoginModal from '../../hooks/useOpenLoginModal'
import { userState } from '../../recoils/user'
import Input from '../@shared/Input'
import CommentAction from './CommentAction'

interface Props {
  value: string
  mode: 'create' | 'edit'
  onChange(text: string): void
  onSubmit(): Promise<any>
  onClose?(): void
}

const commentFocusMode = {
  create: false,
  edit: true,
}

const WriteComment = ({ value, mode, onChange, onSubmit, onClose }: Props) => {
  const [focus, setFocus] = useState(commentFocusMode[mode])
  const currentUser = useRecoilValue(userState)
  const loginModal = useOpenLoginModal()

  const handleSubmit = async () => {
    await onSubmit()
    handleCancel()
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (!currentUser) {
      loginModal()
      event.target.blur()
      return
    }
    setFocus(true)
  }

  const handleCancel = () => {
    setFocus(false)
    onClose?.()
    onChange('')
  }

  return (
    <div css={container}>
      <Input
        onFocus={handleFocus}
        onChange={handleChange}
        value={value}
        placeholder="댓글을 입력하세요."
      />
      {focus && (
        <CommentAction
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          cancelText="취소"
          submitText="확인"
        />
      )}
    </div>
  )
}

const container = css`
  display: flex;
  flex-direction: column;
`

export default WriteComment
