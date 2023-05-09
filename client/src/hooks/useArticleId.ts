import React from 'react'
import { useParams } from 'react-router-dom'

const useArticleId = () => {
  const { articleId } = useParams<{ articleId: string }>()
  return articleId ? parseInt(articleId) : null
}

export default useArticleId
