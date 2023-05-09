import React from 'react'
import BasicLayout from '../../components/@layout/BasicLayout'
import HeaderBackButton from '../../components/header/HeaderBackButton'
import useArticle from '../../hooks/apis/article/useArticle'
import useArticleId from '../../hooks/useArticleId'
import useGoBack from '../../hooks/useGoBack'
import ArticleDetailView from '../../components/article/ArticleDetailView'
import { getUser } from '../../lib/user'
import MoreButton from '../../components/@shared/MoreButton'
import { useSetRecoilState } from 'recoil'
import { bottomSheetModalSelector } from '../../recoils/bottomSheetModal'
import { useNavigate } from 'react-router-dom'
import useDeleteArticle from '../../hooks/apis/article/useDeleteArticle'

const ArticleDetail = () => {
  const goBack = useGoBack()
  const navigate = useNavigate()
  const articleId = useArticleId()!
  const { data: article } = useArticle({ articleId })
  const currentUser = getUser()
  const isMyArticle = currentUser?.id === article?.user.id
  const bottomSheetModal = useSetRecoilState(bottomSheetModalSelector)
  const { mutate: onDeleteArticle } = useDeleteArticle()

  const handleBottomSheetModal = () => {
    bottomSheetModal({
      config: {
        items: [
          {
            text: '수정',
            onClick: () => navigate(`/write/edit?articleId=${articleId}`),
          },
          {
            text: '삭제',
            onClick: () => {
              onDeleteArticle(articleId)
              navigate('/')
            },
          },
        ],
      },
      visible: true,
    })
  }

  if (!article) return null

  return (
    <BasicLayout
      left={<HeaderBackButton onClick={goBack} />}
      right={isMyArticle && <MoreButton onClick={handleBottomSheetModal} />}
    >
      <ArticleDetailView article={article} />
    </BasicLayout>
  )
}

export default ArticleDetail
