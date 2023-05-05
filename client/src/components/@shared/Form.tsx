import { css } from '@emotion/react'
import React, { FormHTMLAttributes, ReactNode } from 'react'
import styles from '../../lib/styles'

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode
  footer?: ReactNode
}

const Form = ({ children, footer, ...rest }: Props) => {
  return (
    <form {...rest} css={form}>
      <div css={top}>{children}</div>
      {footer && <div css={bottom}>{footer}</div>}
    </form>
  )
}

const form = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  ${styles.padding}
`

const top = css`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const bottom = css`
  padding-top: 20px;
`

export default Form
