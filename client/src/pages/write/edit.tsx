import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { WriteFormSubmitParams } from '.'
import BasicLayout from '../../components/@layout/BasicLayout'
import HeaderBackButton from '../../components/header/HeaderBackButton'
import WriteForm from '../../components/write/WriteForm'
import useArticle from '../../hooks/apis/article/useArticle'
import useUpdateArticle from '../../hooks/apis/article/useUpdateArticle'
import useUpload from '../../hooks/apis/upload/useUpload'
import useGoBack from '../../hooks/useGoBack'

const WriteEdit = () => {
  const goBack = useGoBack()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('articleId') ?? ''
  const { data: article } = useArticle({ articleId: parseInt(articleId) })
  const { mutate: onUpdateArticle } = useUpdateArticle()
  const { mutateAsync: onUpload } = useUpload()

  const onSubmit = async ({
    title,
    formData,
    editor,
    getImages,
  }: WriteFormSubmitParams) => {
    let thumbnail = ''

    if (getImages().length) {
      const { url } = await onUpload({ path: 'articles', formData })
      getImages().forEach((image, index) => (image.src = url[index]))
      thumbnail = url[0]
    }

    onUpdateArticle(
      {
        title,
        body: editor.innerHTML,
        articleId: parseInt(articleId),
        ...(thumbnail ? { thumbnail } : null),
      },
      {
        onSuccess: ({ id }) => navigate(`/articles/${id}`),
      },
    )
  }

  if (!article) return null

  return (
    <BasicLayout title="수정" left={<HeaderBackButton onClick={goBack} />}>
      <WriteForm submit={onSubmit} defaultValue={article} />
    </BasicLayout>
  )
}

export default WriteEdit
