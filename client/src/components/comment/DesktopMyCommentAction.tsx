import { css } from '@emotion/react'
import React from 'react'
import { mediaQuery } from '../../lib/mediaQuery'

interface Props {
  onEdit(): void
  onDelete(): void
}

const DesktopMyCommentAction = ({ onEdit, onDelete }: Props) => {
  return (
    <div css={container}>
      <button onClick={onEdit}>수정</button>
      <button onClick={onDelete}>삭제</button>
    </div>
  )
}

const container = css`
  display: none;

  ${mediaQuery.tablet} {
    display: flex;
    justify-content: end;
    margin-right: -4px;

    & > *:not(:last-child) {
      margin-right: 6px;
    }

    & button {
      font-size: 14px;
      padding: 4px;
    }
  }
`

export default DesktopMyCommentAction
