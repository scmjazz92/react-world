import React from 'react'
import { StoryMode } from '../../apis/types'
import useStoryArticles from '../../hooks/apis/story/useStoryArticles'
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
    <ul>
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

export default StoryList
