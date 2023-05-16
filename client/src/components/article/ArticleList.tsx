import { css } from '@emotion/react'
import React from 'react'
import useArticles from '../../hooks/apis/article/useArticles'
import { mediaQuery } from '../../lib/mediaQuery'
import styles from '../../lib/styles'
import EmptyMessage from '../@shared/EmptyMessage'
import ArticleItem from './ArticleItem'

const ArticleList = () => {
  const { data: articles } = useArticles()

  if (!articles) return null

  return articles.list.length ? (
    <ul css={container}>
      {articles.list.map((article) => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </ul>
  ) : (
    <EmptyMessage text="작성된 글이 없습니다." />
  )
}

const container = css`
  ${styles.padding}

  ${mediaQuery.tablet} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

  ${mediaQuery.desktop} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 60px;
  }
`

export default ArticleList
