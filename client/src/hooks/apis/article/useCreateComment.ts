import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { CustomMutationOptions } from '../../../lib/types'
import Article from '../../../apis/article'
import queryClient, { QUERY_KEYS } from '../../../lib/queryClient'
import { ArticleResult, CommentsResult } from '../../../apis/types'

interface Props {
  articleId: number
  options?: CustomMutationOptions<typeof Article.createComment>
}

const useCreateComment = ({ articleId, options }: Props) => {
  return useMutation(Article.createComment, {
    ...options,
    onSuccess(newComment) {
      const prevComments = queryClient.getQueryData<CommentsResult>([
        QUERY_KEYS.COMMENTS,
        articleId,
      ])

      const prevArticle = queryClient.getQueryData<ArticleResult>([
        QUERY_KEYS.ARTICLES,
        articleId,
      ])
      if (!prevComments || !prevArticle) return

      const resultComments = { list: [...prevComments.list, newComment] }

      const resultArticle = {
        ...prevArticle,
        articleStats: {
          ...prevArticle.articleStats,
          commentsCount: prevArticle.articleStats.commentsCount + 1,
        },
      }

      queryClient.setQueryData([QUERY_KEYS.COMMENTS, articleId], resultComments)
      queryClient.setQueryData([QUERY_KEYS.ARTICLES, articleId], resultArticle)
    },
  })
}

export default useCreateComment
