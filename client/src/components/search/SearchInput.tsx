import { css } from '@emotion/react'
import React, { ChangeEvent } from 'react'
import colors from '../../lib/colors'
import { Search } from '../@icon'
import Input from '../@shared/Input'

interface Props {
  value: string
  onChange(event: ChangeEvent<HTMLInputElement>): void
}

const SearchInput = ({ value, onChange }: Props) => {
  return (
    <div css={container}>
      <div css={block}>
        <Search />
        <Input css={input} value={value} onChange={onChange} />
      </div>
    </div>
  )
}

const container = css`
  position: sticky;
  top: 0;
  background: ${colors.white};
  padding: 16px;
`

const block = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 8px;
  background: ${colors.grey50};
  border-radius: 4px;

  & svg {
    width: 16px;
    height: 16px;
  }
`

const input = css`
  height: auto;
  border: 0;
  border-radius: 4px;
  padding: 0 0 0 8px;
  background: ${colors.grey50};
`

export default SearchInput
