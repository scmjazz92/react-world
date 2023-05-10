import { css } from '@emotion/react'
import React, { InputHTMLAttributes } from 'react'
import colors from '../../lib/colors'

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string | null
}

const Input = ({ errorMessage, ...rest }: Props) => {
  return (
    <>
      <input {...rest} css={input} />
      {errorMessage && <p css={error}>{errorMessage}</p>}
    </>
  )
}

const input = css`
  display: block;
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid ${colors.grey100};
  border-radius: 4px;

  &::placeholder {
    color: ${colors.grey200};
  }

  &:focus {
    border-color: ${colors.blue100};
  }

  &: disabled {
    background: ${colors.grey50};
  }
`

const error = css`
  padding-top: 6px;
  font-size: 12px;
  color: ${colors.red100};
`

export default Input
