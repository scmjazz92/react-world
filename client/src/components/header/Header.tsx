import { css } from '@emotion/react'
import React, { ReactNode } from 'react'
import colors from '../../lib/colors'

export interface Props {
  title?: string
  left?: ReactNode
  right?: ReactNode
}

const Header = ({ title = 'world', left, right }: Props) => {
  return (
    <header css={header}>
      <h1>{title}</h1>
      {left && <div css={side('left')}>{left}</div>}
      {right && <div css={side('right')}>{right}</div>}
    </header>
  )
}

const header = css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 56px;
  border-bottom: 1px solid ${colors.grey100};

  & > h1 {
    font-size: 20px;
    color: ${colors.black};
  }
`

const side = (position: 'left' | 'right') => css`
  position: absolute;
  ${position}: 12px;
  height: 100%;
  margin-${position}: -12px;

  & button {
    display: block;
    height: 100%;
    padding: 0 16px;
  }
`

export default Header
