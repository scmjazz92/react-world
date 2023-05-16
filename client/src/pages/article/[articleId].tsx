import React from 'react'
import BasicLayout from '../../components/@layout/BasicLayout'
import HeaderBackButton from '../../components/header/HeaderBackButton'
import useArticle from '../../hooks/apis/article/useArticle'
import useArticleId from '../../hooks/useArticleId'
import ArticleDetailView from '../../components/article/ArticleDetailView'
import MoreButton from '../../components/@shared/MoreButton'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { bottomSheetModalSelector } from '../../recoils/bottomSheetModal'
import { useNavigate } from 'react-router-dom'
import useDeleteArticle from '../../hooks/apis/article/useDeleteArticle'
import Comment from '../../components/comment/Comment'
import { userState } from '../../recoils/user'
import useRedirect from '../../hooks/useRedirect'
import DesktopMyArticleAction from '../../components/article/DesktopMyArticleAction'

const ArticleDetail = () => {
  const redirect = useRedirect()
  const navigate = useNavigate()
  const articleId = useArticleId()!
  const { data: article } = useArticle({ articleId })
  const currentUser = useRecoilValue(userState)
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
              onDeleteArticle(articleId, {
                onSuccess: () => redirect(),
              })
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
      left={<HeaderBackButton onClick={redirect} />}
      right={isMyArticle && <MoreButton onClick={handleBottomSheetModal} />}
    >
      <ArticleDetailView
        article={article}
        desktopAction={
          <DesktopMyArticleAction
            articleId={articleId}
            onDelete={() =>
              onDeleteArticle(articleId, {
                onSuccess: () => redirect(),
              })
            }
          />
        }
      />
      <Comment commentsCount={article.articleStats.commentsCount} />
    </BasicLayout>
  )
}

export default ArticleDetail
