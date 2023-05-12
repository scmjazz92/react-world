import React from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { StoryMode } from '../../apis/types'
import BasicLayout from '../../components/@layout/BasicLayout'
import StoryList from '../../components/story/StoryList'
import TabFlexMode from '../../components/tab/TabFlexMode'
import TabLinkItem from '../../components/tab/TabModeItem'

const Story = () => {
  const location = useLocation()
  const username = location.pathname.split('/')[2]
  const [searchParams] = useSearchParams()
  const mode = (searchParams.get('mode') ?? 'user') as StoryMode

  return (
    <BasicLayout title={username}>
      <TabFlexMode>
        <TabLinkItem
          to={`/story/${username}?mode=user`}
          text="내 게시물"
          mode={mode}
        />
        <TabLinkItem
          to={`/story/${username}?mode=like`}
          text="좋아요"
          mode={mode}
        />
      </TabFlexMode>
      <StoryList username={username} mode={mode} />
    </BasicLayout>
  )
}

export default Story
