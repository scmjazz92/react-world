import { css } from '@emotion/react'
import React, { ChangeEvent } from 'react'
import { Album } from '../@icon'
import FileInput from '../@shared/FileInput'

interface Props {
  onChange(event: ChangeEvent<HTMLInputElement>): void
}

const EditorOptions = ({ onChange }: Props) => {
  return (
    <ul css={container}>
      <li className="album">
        <FileInput
          label={<Album />}
          onChange={onChange}
          accept="image/*"
          htmlFor="image"
        />
      </li>
    </ul>
  )
}

const container = css`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;

  & li {
    width: 24px;
    text-align: center;
    opacity: 0.8;

    &:not(:first-of-type) {
      margin-right: 10px;
    }
  }

  .album {
    padding-top: 2px;
  }

  & svg {
    display: block;
    cursor: pointer;
  }
`

export default EditorOptions
