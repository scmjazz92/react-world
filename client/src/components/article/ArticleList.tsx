import { css } from '@emotion/react'
import React from 'react'
import useArticles from '../../hooks/apis/article/useArticles'
import { mediaQuery } from '../../lib/mediaQuery'
import styles from '../../lib/styles'
import ArticleItem from './ArticleItem'

const ArticleList = () => {
  const { data: articles } = useArticles()

  if (!articles) return null

  return (
    <ul css={container}>
      {articles.list.map((article) => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </ul>
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
    margin: 0 auto;
    gap: 60px;
  }
`

export default ArticleList
