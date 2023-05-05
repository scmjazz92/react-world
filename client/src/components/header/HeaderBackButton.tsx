import { css } from '@emotion/react'
import React from 'react'
import { ArrowLeft } from '../@icon'

interface Props {
  onClick: () => void
}

const HeaderBackButton = ({ onClick }: Props) => {
  return (
    <button onClick={onClick} css={button}>
      <ArrowLeft />
    </button>
  )
}

const button = css`
  & svg {
    display: block;
    width: 24px;
    height: 24px;
  }
`

export default HeaderBackButton
