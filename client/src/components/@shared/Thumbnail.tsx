import { css } from '@emotion/react'
import React, { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  url: string
  alt?: string
  size?: 'small'
}

const Thumbnail = ({ url, alt, size = 'small', ...rest }: Props) => {
  return (
    <div {...rest} css={container} className={size}>
      <img src={url} alt={alt} />
    </div>
  )
}

const container = css`
  &.small {
    width: 50px;
  }

  & img {
    display: block;
    max-width: 100%;
    object-fit: cover;
    aspect-ratio: 1/1;
    border-radius: 4px;
  }
`

export default Thumbnail
