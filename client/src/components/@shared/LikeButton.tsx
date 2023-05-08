import { css } from '@emotion/react'
import React, { ButtonHTMLAttributes } from 'react'
import { Like, Unlike } from '../@icon'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLiked: boolean
  onClick(): void
}

const LikeButton = ({ isLiked, onClick, ...rest }: Props) => {
  return (
    <button css={button} onClick={onClick} {...rest}>
      {isLiked ? <Like /> : <Unlike />}
    </button>
  )
}

const button = css`
  width: 20px;
  height: 20px;

  & svg {
    width: 100%;
    height: 100%;
  }
`

export default LikeButton
