import { css } from '@emotion/react'
import React from 'react'
import colors from '../../lib/colors'
import Input, { Props as InputProps } from './Input'

interface Props extends InputProps {
  label: string
}

const LabelInput = ({ label, ...rest }: Props) => {
  return (
    <div css={block}>
      <label css={labelBlock}>
        <strong css={title}>{label}</strong>
        <Input {...rest} />
      </label>
    </div>
  )
}

const block = css`
  &:not(:first-of-type) {
    padding-top: 20px;
  }
`

const labelBlock = css`
  &:focus-within {
    color: ${colors.blue200};
  }

  & strong {
    display: block;
    padding-bottom: 6px;
  }
`

const title = css`
  display: block;
  padding-bottom: 6px;
`

export default LabelInput
