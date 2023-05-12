import { css } from '@emotion/react'
import React from 'react'
import { Link } from 'react-router-dom'
import colors from '../../lib/colors'

interface Props {
  to: string
  text: string
  mode: string
}

const TabLinkItem = ({ to, text, mode }: Props) => {
  return (
    <Link
      css={link}
      to={to}
      className={to.includes(mode) ? 'active' : ''}
      role="tab"
    >
      {text}
    </Link>
  )
}

const link = css`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  font-size: 14px;

  &.active {
    background: ${colors.blue100};
    color: ${colors.white};
  }
`

export default TabLinkItem
