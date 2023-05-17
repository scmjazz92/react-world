import { css } from '@emotion/react'
import React from 'react'
import { Link } from 'react-router-dom'
import colors from '../lib/colors'

const NotFound = () => {
  return (
    <div css={container}>
      <h1>404 Not Found</h1>
      <p>찾을 수 없는 페이지입니다.</p>
      <Link to="/">메인으로 돌아가기</Link>
    </div>
  )
}

const container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  text-align: center;

  & p {
    margin-top: 10px;
  }

  & a {
    margin-top: 10px;
    text-decoration: underline;
    color: ${colors.blue100};
  }
`

export default NotFound
