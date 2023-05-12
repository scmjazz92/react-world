import React from 'react'
import { StoryMode } from '../../apis/types'
import useStoryArticles from '../../hooks/apis/story/useStoryArticles'
import ArticleItem from '../article/ArticleItem'

interface Props {
  username: string
  mode: StoryMode
}

const StoryList = ({ username, mode }: Props) => {
  const { data: storyArticles } = useStoryArticles({ username, mode })

  if (!storyArticles) return null

  return (
    <ul>
      {storyArticles.list.map((article) => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </ul>
  )
}

export default StoryList
