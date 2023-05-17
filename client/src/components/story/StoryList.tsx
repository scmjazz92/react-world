import { css } from '@emotion/react'
import React, { useEffect, useRef } from 'react'
import { StoryMode } from '../../apis/types'
import useStoryArticles from '../../hooks/apis/story/useStoryArticles'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import { mediaQuery } from '../../lib/mediaQuery'
import styles from '../../lib/styles'
import EmptyMessage from '../@shared/EmptyMessage'
import ArticleItem from '../article/ArticleItem'

interface Props {
  username: string
  mode: StoryMode
  nextPath?: string
}

const emptyMessageMap = {
  user: '게시물이 없습니다.',
  like: '좋아요 한 게시물이 없습니다.',
}

const StoryList = ({ username, mode, nextPath }: Props) => {
  const {
    data: storyArticles,
    hasNextPage,
    fetchNextPage,
  } = useStoryArticles({ username, mode })
  const fetchMoreRef = useRef<HTMLDivElement>(null)
  const intersecting = useInfiniteScroll({ targetRef: fetchMoreRef })

  useEffect(() => {
    if (!intersecting || !hasNextPage) return
    fetchNextPage()
  }, [intersecting, fetchNextPage])

  if (!storyArticles) return null

  return storyArticles.pages[0].list.length ? (
    <>
      <ul css={container}>
        {storyArticles.pages.map((page) =>
          page.list.map((article) => (
            <ArticleItem
              key={article.id}
              article={article}
              path={`/articles/${article.id}?next=/story/${username}?mode=${mode}${nextPath}`}
            />
          )),
        )}
      </ul>
      <div ref={fetchMoreRef}></div>
    </>
  ) : (
    <EmptyMessage text={emptyMessageMap[mode]} />
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

export default StoryList
