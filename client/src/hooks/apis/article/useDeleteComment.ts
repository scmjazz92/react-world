import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { CustomMutationOptions } from '../../../lib/types'
import Article from '../../../apis/article'
import queryClient, { QUERY_KEYS } from '../../../lib/queryClient'
import { ArticleResult, CommentsResult } from '../../../apis/types'

interface Props {
  articleId: number
  commentId: number
  options?: CustomMutationOptions<typeof Article.deleteComment>
}

const useDeleteComment = ({ articleId, commentId, options }: Props) => {
  return useMutation(Article.deleteComment, {
    ...options,
    onSuccess() {
      const prevComments = queryClient.getQueryData<CommentsResult>([
        QUERY_KEYS.COMMENTS,
        articleId,
      ])

      const prevArticle = queryClient.getQueryData<ArticleResult>([
        QUERY_KEYS.ARTICLES,
        articleId,
      ])

      if (!prevComments || !prevArticle) return

      const deleteComments = prevComments.list.filter(
        (comment) => comment.id !== commentId,
      )

      const resultComments = { list: deleteComments }

      const resultArticle = {
        ...prevArticle,
        articleStats: {
          ...prevArticle.articleStats,
          commentsCount: prevArticle.articleStats.commentsCount - 1,
        },
      }

      queryClient.setQueryData([QUERY_KEYS.COMMENTS, articleId], resultComments)
      queryClient.setQueryData([QUERY_KEYS.ARTICLES, articleId], resultArticle)
    },
  })
}

export default useDeleteComment
