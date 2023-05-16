import { css } from '@emotion/react'
import React from 'react'
import useSearchArticles from '../../hooks/apis/search/useSearchArticles'
import { mediaQuery } from '../../lib/mediaQuery'
import styles from '../../lib/styles'
import EmptyMessage from '../@shared/EmptyMessage'
import ArticleItem from '../article/ArticleItem'

interface Props {
  searchText?: string
}

const SearchList = ({ searchText }: Props) => {
  const { data: articles } = useSearchArticles({
    value: searchText,
  })

  if (!articles) return null

  return articles.list.length ? (
    <ul css={container}>
      {articles.list.map((article) => (
        <ArticleItem
          key={article.id}
          article={article}
          path={`/articles/${article.id}?next=/search?value=${searchText}`}
        />
      ))}
    </ul>
  ) : searchText ? (
    <EmptyMessage text="검색된 결과가 없습니다." />
  ) : null
}

const container = css`
  ${styles.padding}
`

export default SearchList
