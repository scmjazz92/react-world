import { css } from '@emotion/react'
import React from 'react'
import { ArticleStats as Stats } from '../../apis/types'
import colors from '../../lib/colors'
import validate from '../../lib/validate'

interface Props extends Stats {}

const ArticleStats = ({ likes, views, commentsCount }: Partial<Props>) => {
  return (
    <div css={stats}>
      {validate.isInteger(likes) && (
        <span className="count">좋아요 {likes}개</span>
      )}
      {validate.isInteger(commentsCount) && (
        <span className="count">댓글 {commentsCount}개</span>
      )}
      {validate.isInteger(views) && (
        <span className="count">조회수 {views}</span>
      )}
    </div>
  )
}

const stats = css`
  display: flex;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 16px;
  color: ${colors.grey300};

  .count {
    font-size: 12px;
    font-weight: bold;

    &:not(:last-of-type) {
      padding-right: 10px;
    }
  }
`

export default ArticleStats
