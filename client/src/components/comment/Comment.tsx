import { css } from '@emotion/react'
import React, { useRef } from 'react'
import colors from '../../lib/colors'
import { mediaQuery } from '../../lib/mediaQuery'
import styles from '../../lib/styles'
import CommentList from './CommentList'
import CreateComment from './CreateComment'

interface Props {
  commentsCount: number
}

const Comment = ({ commentsCount }: Props) => {
  const rootRef = useRef<HTMLDivElement>(null)

  return (
    <div css={container} ref={rootRef}>
      <h3 css={title}>댓글 {commentsCount}개</h3>
      <CreateComment rootRef={rootRef} />
      <CommentList />
    </div>
  )
}

const container = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  ${styles.padding}
  padding-top:0;

  ${styles.desktopInner}
`

const title = css`
  padding-top: 24px;
  padding-bottom: 14px;
  font-size: 16px;
  font-weight: bold;
  border-top: 1px solid ${colors.grey100};
`

export default Comment
