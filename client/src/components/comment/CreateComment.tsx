import React, { RefObject, useState } from 'react'
import useCreateComment from '../../hooks/apis/article/useCreateComment'
import useArticleId from '../../hooks/useArticleId'
import useScrollIntoView from '../../hooks/useScrollIntoView'
import WriteComment from './WriteComment'

interface Props {
  rootRef: RefObject<HTMLElement>
}

const CreateComment = ({ rootRef }: Props) => {
  const [text, onChange] = useState('')
  const articleId = useArticleId()!
  const { mutateAsync: onCreateComment } = useCreateComment({ articleId })
  const scrollToBottom = useScrollIntoView({ ref: rootRef, block: 'end' })

  const onSubmit = async () => {
    await onCreateComment({
      articleId,
      text,
    })
    scrollToBottom()
  }
  return (
    <WriteComment
      onChange={onChange}
      onSubmit={onSubmit}
      value={text}
      mode="create"
    />
  )
}

export default CreateComment
