import React from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { StoryMode } from '../../apis/types'
import BasicLayout from '../../components/@layout/BasicLayout'
import BlindHeading from '../../components/@shared/BlindHeading'
import HeaderBackButton from '../../components/header/HeaderBackButton'
import StoryList from '../../components/story/StoryList'
import TabFlexMode from '../../components/tab/TabFlexMode'
import TabLinkItem from '../../components/tab/TabModeItem'
import useMediaQuery from '../../hooks/useMediaQuery'
import useRedirect from '../../hooks/useRedirect'

const Story = () => {
  const { isMobile } = useMediaQuery()
  const redirect = useRedirect()
  const location = useLocation()
  const username = location.pathname.split('/')[2]
  const [searchParams] = useSearchParams()
  const mode = (searchParams.get('mode') ?? 'user') as StoryMode
  const next = searchParams.get('next') ?? ''
  const nextPath = next ? `&next=${next}` : ''

  return (
    <BasicLayout
      title={username}
      left={<HeaderBackButton onClick={redirect} />}
    >
      {!isMobile && <BlindHeading heading={username + ' 스토리'} level={2} />}
      <TabFlexMode>
        <TabLinkItem
          to={`/story/${username}?mode=user${nextPath}`}
          text="내 게시물"
          mode={mode}
        />
        <TabLinkItem
          to={`/story/${username}?mode=like${nextPath}`}
          text="좋아요"
          mode={mode}
        />
      </TabFlexMode>
      <StoryList username={username} mode={mode} nextPath={nextPath} />
    </BasicLayout>
  )
}

export default Story
