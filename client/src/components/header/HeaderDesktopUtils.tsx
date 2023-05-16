import { css } from '@emotion/react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import useLogout from '../../hooks/apis/auth/useLogout'
import colors from '../../lib/colors'
import { mediaQuery } from '../../lib/mediaQuery'
import { userState } from '../../recoils/user'

const HeaderDesktopUtils = () => {
  const currentUser = useRecoilValue(userState)
  const onLogout = useLogout()

  return (
    <div css={container}>
      <nav>
        {!currentUser ? (
          <>
            <NavLink to="/auth/login" className="login">
              로그인
            </NavLink>
            <NavLink to="/auth/register" className="register">
              회원가입
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/write">새 글 등록</NavLink>
            <NavLink to={`/story/${currentUser.username}`}>내 스토리</NavLink>
            <NavLink to="/setting/mypage">마이페이지</NavLink>
          </>
        )}
      </nav>
      {currentUser && <button onClick={onLogout}>로그아웃</button>}
    </div>
  )
}

const container = css`
  display: none;

  ${mediaQuery.tablet} {
    display: flex;

    & nav {
      display: flex;
    }

    & a,
    & button {
      display: block;
      padding: 10px;
      font-size: 14px;
    }

    & a.active {
      color: ${colors.blue100};
      font-weight: bold;
    }

    & button {
      background: ${colors.blue100};
      color: #fff;
      border-radius: 4px;
    }

    & *:not(:last-child) {
      margin-right: 10px;
    }
  }
`

export default HeaderDesktopUtils
