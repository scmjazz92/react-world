import { css, jsx } from '@emotion/react'
import React, { HTMLAttributes } from 'react'
import styles from '../../lib/styles'

const headingMap = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  heading: string
  level: keyof typeof headingMap
}

const BlindHeading = ({ heading, level }: Props) => {
  const headingElement = jsx(headingMap[level], {
    className: 'blind',
    children: heading,
    css: styles.blind,
  })

  return headingElement
}

export default BlindHeading
