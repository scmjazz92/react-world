import { css } from '@emotion/react'
import React from 'react'
import colors from '../../lib/colors'
import FooterItem from './FooterItem'

const Footer = () => {
  return (
    <footer>
      <ul css={block}>
        <FooterItem to="/" icon="home" />
        <FooterItem to="/search" icon="search" />
        <FooterItem to="/write" icon="write" />
        <FooterItem to="/setting" icon="setting" />
      </ul>
    </footer>
  )
}

const block = css`
  display: flex;
  height: 50px;
  border-top: 1px solid ${colors.grey100};
`

export default Footer
