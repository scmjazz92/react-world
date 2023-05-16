import { css } from '@emotion/react'
import React, { createElement, HTMLAttributes, ReactNode } from 'react'
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
  children: ReactNode
  level: keyof typeof headingMap
}

const BlindHeadingSection = ({ heading, level, children, ...rest }: Props) => {
  const headingElement = createElement(headingMap[level], {
    className: 'blind',
    children: heading,
  })

  return (
    <section css={section} {...rest}>
      {headingElement}
      {children}
    </section>
  )
}

const section = css`
  .blind {
    ${styles.blind}
  }
`

export default BlindHeadingSection
