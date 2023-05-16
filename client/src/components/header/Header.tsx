import { css } from '@emotion/react'
import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import useMediaQuery from '../../hooks/useMediaQuery'
import colors from '../../lib/colors'
import { mediaQuery } from '../../lib/mediaQuery'
import HeaderDesktopUtils from './HeaderDesktopUtils'

export interface Props {
  title?: string
  left?: ReactNode
  right?: ReactNode
}

const Header = ({ title = 'world', left, right }: Props) => {
  const { isMobile } = useMediaQuery()

  return (
    <header css={header}>
      <h1>
        {isMobile ? (
          title
        ) : (
          <Link className="desktop" to="/">
            world
          </Link>
        )}
      </h1>
      {left && <div css={side('left')}>{left}</div>}
      {right && <div css={side('right')}>{right}</div>}
      <HeaderDesktopUtils />
    </header>
  )
}

const header = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 56px;
  border-bottom: 1px solid ${colors.grey100};

  & > h1 {
    font-size: 20px;
    color: ${colors.black};
  }

  ${mediaQuery.tablet} {
    padding: 0 16px;

    & > h1 {
      margin-right: auto;
    }
  }
`

const side = (position: 'left' | 'right') => css`
  position: absolute;
  ${position}: 12px;
  height: 100%;
  margin-${position}: -12px;

  & button {
    display: block;
    height: 100%;
    padding: 0 16px;
  }

  ${mediaQuery.tablet}{
    display: none;
  }
`

export default Header
