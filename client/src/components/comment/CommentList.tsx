import React from 'react'
import useComments from '../../hooks/apis/article/useComments'
import useArticleId from '../../hooks/useArticleId'
import CommentItem from './CommentItem'

const CommentList = () => {
  const articleId = useArticleId()!
  const { data: comments } = useComments({ articleId })

  if (!comments) return null

  return (
    <ul>
      {comments.list.map((comment) => (
        <CommentItem key={comment.id} comment={comment} articleId={articleId} />
      ))}
    </ul>
  )
}

export default CommentList
