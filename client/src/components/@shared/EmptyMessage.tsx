import { css } from '@emotion/react'
import React from 'react'

interface Props {
  text: string
}
const EmptyMessage = ({ text }: Props) => {
  return (
    <div css={block}>
      <p>{text}</p>
    </div>
  )
}

const block = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;

  & p {
    padding-top: 10px;
    font-size: 16px;
    line-height: 1.5;
    font-weight: bold;
    text-align: center;
  }
`

export default EmptyMessage
