import { css } from '@emotion/react'
import React from 'react'
import { StoryMode } from '../../apis/types'
import useStoryArticles from '../../hooks/apis/story/useStoryArticles'
import { mediaQuery } from '../../lib/mediaQuery'
import styles from '../../lib/styles'
import ArticleItem from '../article/ArticleItem'

interface Props {
  username: string
  mode: StoryMode
  nextPath?: string
}

const StoryList = ({ username, mode, nextPath }: Props) => {
  const { data: storyArticles } = useStoryArticles({ username, mode })

  if (!storyArticles) return null

  return (
    <ul css={container}>
      {storyArticles.list.map((article) => (
        <ArticleItem
          key={article.id}
          article={article}
          path={`/articles/${article.id}?next=/story/${username}?mode=${mode}${nextPath}`}
        />
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
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
  }

  ${mediaQuery.desktop} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 0 auto;
    gap: 60px;
  }
`

export default StoryList
