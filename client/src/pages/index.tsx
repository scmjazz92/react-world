import React from 'react'
import BasicLayout from '../components/@layout/BasicLayout'
import BlindHeadingSection from '../components/@shared/BlindHeadingSection'
import ArticleList from '../components/article/ArticleList'
import Footer from '../components/footer/Footer'

const Main = () => {
  return (
    <BasicLayout footer={<Footer />}>
      <BlindHeadingSection heading="아티클 리스트" level={2}>
        <ArticleList />
      </BlindHeadingSection>
    </BasicLayout>
  )
}

export default Main
