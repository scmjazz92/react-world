import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { CustomMutationOptions } from '../../../lib/types'
import Article from '../../../apis/article'
import { useSetRecoilState } from 'recoil'
import { likeItemSelector } from '../../../recoils/like'

const useArticleLike = (
  options: CustomMutationOptions<typeof Article.like> = {},
) => {
  return useMutation(Article.like, {
    ...options,
  })
}

const useArticleUnlike = (
  options: CustomMutationOptions<typeof Article.unlike> = {},
) => {
  return useMutation(Article.unlike, {
    ...options,
  })
}

const useLike = (id: number) => {
  const { mutate: onLike } = useArticleLike()
  const { mutate: onUnlike } = useArticleUnlike()
  const set = useSetRecoilState(likeItemSelector(id))

  const like = (id: number) => {
    onLike(id, {
      onSuccess: (like) => set(like),
    })
  }

  const unlike = (id: number) => {
    onUnlike(id, {
      onSuccess: (like) => set(like),
    })
  }

  return { like, unlike }
}

export default useLike
