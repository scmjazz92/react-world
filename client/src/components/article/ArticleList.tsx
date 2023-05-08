import React from 'react'
import useArticles from '../../hooks/apis/article/useArticles'
import ArticleItem from './ArticleItem'

const ArticleList = () => {
  const { data: articles } = useArticles()

  if (!articles) return null

  return (
    <ul>
      {articles.list.map((article) => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </ul>
  )
}

export default ArticleList
