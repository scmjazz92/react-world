import { css } from '@emotion/react'
import React from 'react'
import colors from '../../lib/colors'

interface Props {
  onClick(): void
  text: string
}

const SettingButtonItem = ({ onClick, text }: Props) => {
  return (
    <button onClick={onClick} css={item}>
      {text}
    </button>
  )
}

const item = css`
  display: block;
  width: 100%;
  padding: 16px;
  background: ${colors.white};
  color: ${colors.black};
  font-size: 16px;
  text-align: left;
  border-bottom: 1px solid ${colors.grey50};
`

export default SettingButtonItem
