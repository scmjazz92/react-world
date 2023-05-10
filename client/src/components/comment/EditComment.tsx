import React, { useState } from 'react'
import useUpdateComment from '../../hooks/apis/article/useUpdateComment'
import useArticleId from '../../hooks/useArticleId'
import WriteComment from './WriteComment'

interface Props {
  commentId: number
  defaultValue: string
  onClose(): void
}

const EditComment = ({ commentId, defaultValue, onClose }: Props) => {
  const [text, onChange] = useState(defaultValue)
  const articleId = useArticleId()!
  const { mutateAsync: onUpdateComment } = useUpdateComment({ articleId })

  const onSubmit = async () => {
    await onUpdateComment({
      articleId,
      text,
      commentId,
    })
  }

  return (
    <WriteComment
      onChange={onChange}
      onSubmit={onSubmit}
      onClose={onClose}
      value={text}
      mode="edit"
    />
  )
}

export default EditComment
