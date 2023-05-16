import { css } from '@emotion/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { CommentResult } from '../../apis/types'
import useDeleteComment from '../../hooks/apis/article/useDeleteComment'
import { dateFormat } from '../../lib/dateFormat'
import { bottomSheetModalSelector } from '../../recoils/bottomSheetModal'
import { userState } from '../../recoils/user'
import MoreButton from '../@shared/MoreButton'
import DesktopMyCommentAction from './DesktopMyCommentAction'
import EditComment from './EditComment'

interface Props {
  articleId: number
  comment: CommentResult
}

const CommentItem = ({ comment, articleId }: Props) => {
  const {
    user: { username, id: userId },
    text,
    createdAt,
    updatedAt,
    id: commentId,
  } = comment
  const [isEditComment, setIsEditComment] = useState(false)
  const currentUser = useRecoilValue(userState)
  const isMyComment = currentUser?.id === userId

  const { mutate: onDeleteComment } = useDeleteComment({ commentId, articleId })
  const bottomSheetModal = useSetRecoilState(bottomSheetModalSelector)

  const handleBottomSheetModal = ({
    articleId,
    commentId,
  }: {
    articleId: number
    commentId: number
  }) => {
    bottomSheetModal({
      config: {
        items: [
          {
            text: '수정',
            onClick: () => setIsEditComment(true),
          },
          {
            text: '삭제',
            onClick: () => onDeleteComment({ articleId, commentId }),
          },
        ],
      },
      visible: true,
    })
  }

  const date = dateFormat({
    date: new Date(createdAt < updatedAt ? updatedAt : createdAt),
    options: {
      dateStyle: 'medium',
    },
  })

  return (
    <li css={list}>
      <div css={info}>
        <div>
          <Link to={`/story/${username}`} className="username">
            {username}
          </Link>
          <span className="date">{date}</span>
        </div>
        {isMyComment && (
          <>
            <MoreButton
              onClick={() =>
                handleBottomSheetModal({ articleId, commentId: comment.id })
              }
            />
            <DesktopMyCommentAction
              onEdit={() => setIsEditComment(true)}
              onDelete={() => onDeleteComment({ articleId, commentId })}
            />
          </>
        )}
      </div>
      {isEditComment ? (
        <EditComment
          commentId={commentId}
          defaultValue={text}
          onClose={() => setIsEditComment(false)}
        />
      ) : (
        <p css={description}>{text}</p>
      )}
    </li>
  )
}

const list = css`
  padding-top: 30px;
`

const info = css`
  display: flex;
  justify-content: space-between;
  padding-bottom: 6px;

  .username {
    display: inline-block;
    font-size: 16px;
    font-weight: bold;
    line-height: 1.5;
    color: inherit;
  }

  .date {
    padding-left: 10px;
    font-size: 12px;
    vertical-align: middle;
  }
`

const description = css`
  padding-right: 24px;
  font-size: 14px;
  line-height: 1.4;
  word-break: break-all;
`

export default CommentItem
