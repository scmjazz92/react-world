import { css } from '@emotion/react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import colors from '../../lib/colors'
import { Home, Search, Setting, Write } from '../@icon'

const iconMap = {
  home: Home,
  search: Search,
  write: Write,
  setting: Setting,
}

interface Props {
  to: string
  icon: keyof typeof iconMap
}

const FooterItem = ({ to, icon }: Props) => {
  const iconElement = React.createElement(iconMap[icon], {
    className: icon,
  })

  return (
    <li css={list}>
      <NavLink to={to} css={link}>
        {iconElement}
      </NavLink>
    </li>
  )
}

const list = css`
  flex: 1;
`

const link = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  & svg {
    width: 24px;
    height: 24px;
  }

  &.active {
    svg {
      fill: ${colors.blue200};
    }
  }

  &:not(.active) {
    fill: ${colors.grey300};
    opacity: 0.8;
  }

  & > .search {
    width: 26px;
    height: 26px;
  }
`

export default FooterItem
