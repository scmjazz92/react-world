import React from 'react'
import { useNavigate } from 'react-router-dom'
import BasicLayout from '../../components/@layout/BasicLayout'
import BlindHeading from '../../components/@shared/BlindHeading'
import HeaderBackButton from '../../components/header/HeaderBackButton'
import WriteForm from '../../components/write/WriteForm'
import useCreateArticle from '../../hooks/apis/article/useCreateArticle'
import useUpload from '../../hooks/apis/upload/useUpload'
import useMediaQuery from '../../hooks/useMediaQuery'
import useRedirect from '../../hooks/useRedirect'

export interface WriteFormSubmitParams {
  title: string
  formData: FormData
  editor: HTMLDivElement
  getImages(): HTMLImageElement[]
}

const Write = () => {
  const { isMobile } = useMediaQuery()
  const navigate = useNavigate()
  const redirect = useRedirect()
  const { mutate: onCreateArticle } = useCreateArticle()
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

    onCreateArticle(
      {
        title,
        body: editor.innerHTML,
        ...(thumbnail ? { thumbnail } : null),
      },
      {
        onSuccess: ({ id }) => navigate(`/articles/${id}`),
      },
    )
  }

  console.log(isMobile)

  return (
    <BasicLayout
      title="새 글 등록"
      left={<HeaderBackButton onClick={redirect} />}
    >
      {!isMobile && <BlindHeading heading="새 글 작성" level={2} />}
      <WriteForm submit={onSubmit} />
    </BasicLayout>
  )
}

export default Write
