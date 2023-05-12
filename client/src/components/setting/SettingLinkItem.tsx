import { css } from '@emotion/react'
import React from 'react'
import { Link } from 'react-router-dom'
import colors from '../../lib/colors'

interface Props {
  to: string
  text: string
}

const SettingLinkItem = ({ to, text }: Props) => {
  return (
    <Link to={to} css={item}>
      {text}
    </Link>
  )
}

const item = css`
  display: block;
  padding: 16px;
  background: ${colors.white};
  color: ${colors.black};
  font-size: 16px;
  text-align: left;
  border-bottom: 1px solid ${colors.grey50};
`

export default SettingLinkItem
