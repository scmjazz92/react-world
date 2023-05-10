import { css } from '@emotion/react'
import React from 'react'
import colors from '../../lib/colors'

export interface Props {
  onCancel(): void
  onSubmit(): void
  submitText: string
  cancelText: string
}

const CommentAction = ({
  onCancel,
  onSubmit,
  cancelText,
  submitText,
}: Props) => {
  return (
    <div css={block}>
      <button onClick={onCancel} className="cancel">
        {cancelText}
      </button>
      <button onClick={onSubmit} className="submit">
        {submitText}
      </button>
    </div>
  )
}

const block = css`
  display: flex;
  margin-top: 8px;
  margin-left: auto;

  & button {
    padding: 12px 16px;
    border-radius: 4px;
  }

  .submit {
    background: ${colors.blue100};
    color: ${colors.white};
  }

  .cancel {
    margin-right: 4px;
    background: ${colors.blue50};
    color: ${colors.white};
  }
`

export default CommentAction
