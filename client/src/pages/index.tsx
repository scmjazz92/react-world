import { css } from '@emotion/react'
import React from 'react'
import BasicLayout from '../components/@layout/BasicLayout'
import BlindHeading from '../components/@shared/BlindHeading'
import ArticleList from '../components/article/ArticleList'
import Footer from '../components/footer/Footer'
import { mediaQuery } from '../lib/mediaQuery'

const Main = () => {
  return (
    <BasicLayout footer={<Footer />}>
      <BlindHeading heading="아티클 리스트" level={2} />
      <ArticleList />
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
