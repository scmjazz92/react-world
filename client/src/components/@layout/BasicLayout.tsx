import { css } from '@emotion/react'
import React from 'react'
import { ReactNode } from 'react'
import Header, { Props as HeaderProps } from '../header/Header'

interface Props extends HeaderProps {
  children: ReactNode
  footer?: ReactNode
}

const BasicLayout = ({ children, footer, ...rest }: Props) => {
  return (
    <div css={container}>
      <Header {...rest} />
      <div css={contents}>{children}</div>
      {footer}
    </div>
  )
}

const container = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const contents = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: scroll;
`

export default BasicLayout
