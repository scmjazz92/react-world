import { css } from '@emotion/react'
import React, { useEffect, useRef } from 'react'
import useArticles from '../../hooks/apis/article/useArticles'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import { mediaQuery } from '../../lib/mediaQuery'
import styles from '../../lib/styles'
import EmptyMessage from '../@shared/EmptyMessage'
import ArticleItem from './ArticleItem'

const ArticleList = () => {
  const { data: articles, hasNextPage, fetchNextPage } = useArticles()
  const fetchMoreRef = useRef<HTMLDivElement>(null)
  const intersecting = useInfiniteScroll({ targetRef: fetchMoreRef })

  useEffect(() => {
    if (!intersecting || !hasNextPage) return
    fetchNextPage()
  }, [intersecting, fetchNextPage])

  if (!articles) return null

  return articles.pages[0].list.length ? (
    <>
      <ul css={container}>
        {articles.pages.map((page) =>
          page.list.map((article) => (
            <ArticleItem key={article.id} article={article} />
          )),
        )}
      </ul>
      <div ref={fetchMoreRef}></div>
    </>
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
