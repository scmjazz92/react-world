import { css } from '@emotion/react'
import React from 'react'
import BasicLayout from '../components/@layout/BasicLayout'
import BlindHeadingSection from '../components/@shared/BlindHeadingSection'
import ArticleList from '../components/article/ArticleList'
import Footer from '../components/footer/Footer'
import { mediaQuery } from '../lib/mediaQuery'

const Main = () => {
  return (
    <BasicLayout footer={<Footer />}>
      <BlindHeadingSection heading="아티클 리스트" level={2} css={section}>
        <ArticleList />
      </BlindHeadingSection>
    </BasicLayout>
  )
}

const section = css`
  ${mediaQuery.tablet} {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
  }
`

export default Main
