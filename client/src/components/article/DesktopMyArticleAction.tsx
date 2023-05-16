import { css } from '@emotion/react'
import React from 'react'
import { Link } from 'react-router-dom'
import useRedirect from '../../hooks/useRedirect'
import colors from '../../lib/colors'
import { mediaQuery } from '../../lib/mediaQuery'

interface Props {
  articleId: number
  onDelete(): void
}

const DesktopMyArticleAction = ({ articleId, onDelete }: Props) => {
  const redirect = useRedirect()

  return (
    <div css={container}>
      <Link to={`/write/edit?articleId=${articleId}`}>수정</Link>
      <button onClick={onDelete}>삭제</button>
      <button onClick={redirect}>목록</button>
    </div>
  )
}

const container = css`
  display: none;

  ${mediaQuery.tablet} {
    display: flex;
    justify-content: end;
    margin-top: 10px;
    margin-right: -4px;

    & > *:not(:last-child) {
      margin-right: 6px;
    }

    & a,
    & button {
      font-size: 14px;
      padding: 10px;
      background: ${colors.blue100};
      color: ${colors.white};
      border-radius: 4px;
    }
  }
`

export default DesktopMyArticleAction
