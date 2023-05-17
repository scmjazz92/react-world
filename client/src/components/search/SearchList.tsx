import { css } from '@emotion/react'
import React, { useEffect, useRef } from 'react'
import useSearchArticles from '../../hooks/apis/search/useSearchArticles'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import styles from '../../lib/styles'
import EmptyMessage from '../@shared/EmptyMessage'
import ArticleItem from '../article/ArticleItem'

interface Props {
  searchText?: string
}

const SearchList = ({ searchText }: Props) => {
  const {
    data: articles,
    hasNextPage,
    fetchNextPage,
  } = useSearchArticles({ value: searchText })
  const fetchMoreRef = useRef<HTMLDivElement>(null)
  const intersecting = useInfiniteScroll({ targetRef: fetchMoreRef })

  useEffect(() => {
    if (!intersecting || !hasNextPage) return
    fetchNextPage()
  }, [intersecting, fetchNextPage])

  if (!articles) return null

  return (
    <>
      {articles.pages[0].list.length ? (
        <>
          <ul css={container}>
            {articles.pages.map((page) =>
              page.list.map((article) => (
                <ArticleItem
                  key={article.id}
                  article={article}
                  path={`/articles/${article.id}?next=/search?value=${searchText}`}
                />
              )),
            )}
          </ul>
        </>
      ) : searchText ? (
        <EmptyMessage text="검색된 결과가 없습니다." />
      ) : null}
      <div ref={fetchMoreRef}></div>
    </>
  )
}

const container = css`
  ${styles.padding}
`

export default SearchList
