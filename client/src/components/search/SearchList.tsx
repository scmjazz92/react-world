import React from 'react'
import useSearchArticles from '../../hooks/apis/search/useSearchArticles'
import ArticleItem from '../article/ArticleItem'

interface Props {
  searchText?: string
}

const SearchList = ({ searchText }: Props) => {
  const { data: articles } = useSearchArticles({
    value: searchText,
  })

  if (!articles) return null

  return (
    <ul>
      {articles.list.map((article) => (
        <ArticleItem
          key={article.id}
          article={article}
          path={`/articles/${article.id}?next=/search?value=${searchText}`}
        />
      ))}
    </ul>
  )
}

export default SearchList
