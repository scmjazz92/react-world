import { css } from '@emotion/react'
import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import colors from '../../lib/colors'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  errorMessage?: string | null
}

const Button = ({ children, errorMessage, ...rest }: Props) => {
  return (
    <>
      {errorMessage && <p css={error}>{errorMessage}</p>}
      <button type="button" css={button} {...rest}>
        {children}
      </button>
    </>
  )
}

const button = css`
  display: block;
  width: 100%;
  height: 46px;
  background: ${colors.blue100};
  color: #fff;
  font-size: 14px;
  border-radius: 4px;

  &: disabled {
    background: ${colors.blue50};
  }
`

const error = css`
  padding-bottom: 10px;
  font-size: 14px;
  color: ${colors.red100};
  text-align: center;
`

export default Button
