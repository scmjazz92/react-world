import { useMutation } from '@tanstack/react-query'
import React from 'react'
import Article from '../../../apis/article'
import { CommentsResult } from '../../../apis/types'
import queryClient, { QUERY_KEYS } from '../../../lib/queryClient'
import { CustomMutationOptions } from '../../../lib/types'

interface Props {
  articleId: number
  options?: CustomMutationOptions<typeof Article.updateComment>
}

const useUpdateComment = ({ articleId, options }: Props) => {
  return useMutation(Article.updateComment, {
    ...options,
    onSuccess(newComment) {
      const prevComments = queryClient.getQueryData<CommentsResult>([
        QUERY_KEYS.COMMENTS,
        articleId,
      ])

      if (!prevComments) return

      const updateComment = prevComments.list.map((comment) => {
        if (comment.id === newComment.id) {
          return newComment
        }
        return comment
      })

      const resultComments = { list: updateComment }
      queryClient.setQueryData([QUERY_KEYS.COMMENTS, articleId], resultComments)
    },
  })
}

export default useUpdateComment
