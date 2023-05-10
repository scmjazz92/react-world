import { css } from '@emotion/react'
import React, { ButtonHTMLAttributes } from 'react'
import { More } from '../@icon'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick(): void
}

const MoreButton = ({ onClick, ...rest }: Props) => {
  return (
    <button onClick={onClick} css={button} {...rest}>
      <More />
    </button>
  )
}

const button = css`
  height: 24px;

  & svg {
    width: 24px;
    height: 24px;
  }
`

export default MoreButton
