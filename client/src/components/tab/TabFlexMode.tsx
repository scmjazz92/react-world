import { css } from '@emotion/react'
import React, { HTMLAttributes, ReactNode } from 'react'
import colors from '../../lib/colors'

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const TabFlexMode = ({ children, ...rest }: Props) => {
  return (
    <div css={container} {...rest} role="tablist">
      {children}
    </div>
  )
}

const container = css`
  position: sticky;
  top: 0;
  display: flex;
  min-height: 42px;
  border-bottom: 1px solid ${colors.grey100};
  z-index: 10;
  background: ${colors.white};
`

export default TabFlexMode
