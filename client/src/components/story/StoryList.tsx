import { css } from '@emotion/react'
import React from 'react'
import { StoryMode } from '../../apis/types'
import useStoryArticles from '../../hooks/apis/story/useStoryArticles'
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
  const { data: storyArticles } = useStoryArticles({ username, mode })

  if (!storyArticles) return null

  return storyArticles.list.length ? (
    <ul css={container}>
      {storyArticles.list.map((article) => (
        <ArticleItem
          key={article.id}
          article={article}
          path={`/articles/${article.id}?next=/story/${username}?mode=${mode}${nextPath}`}
        />
      ))}
    </ul>
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
