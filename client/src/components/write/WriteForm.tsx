import React, { FormEvent } from 'react'
import Button from '../@shared/Button'
import Form from '../@shared/Form'
import LabelInput from '../@shared/LabelInput'
import useEditor from '../../hooks/useEditor'
import Editor from '../editor/Editor'
import EditorOptions from '../editor/EditorOptions'
import useEmptyValidator from '../../hooks/useEmptyValidator'
import { WriteFormSubmitParams } from '../../pages/write'

interface Props {
  submit(params: WriteFormSubmitParams): void
}

const errorMap = {
  title: '제목을 입력해주세요.',
  body: '내용을 입력해주세요.',
}

const WriteForm = ({ submit }: Props) => {
  const { editorRef, rootRef, onChange, getImages, getFiles } = useEditor()
  const { validator, error } = useEmptyValidator(errorMap)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const title = formData.get('title')
    const editor = editorRef.current

    if (typeof title !== 'string' || !editor) return

    const isValid = validator({
      title: title.trim(),
      body: getImages().length ? ' ' : editor.innerText.trim(),
    })

    if (!isValid) return

    if (getFiles().length) {
      getFiles().forEach((file, index) =>
        formData.append(`${file}${index}`, file),
      )
    }

    submit({
      title,
      formData,
      editor,
      getImages,
    })
  }

  return (
    <Form
      onSubmit={onSubmit}
      footer={
        <Button type="submit" errorMessage={error}>
          등록
        </Button>
      }
    >
      <LabelInput label="제목" name="title" />
      <Editor
        label="내용"
        rootRef={rootRef}
        editorRef={editorRef}
        options={<EditorOptions onChange={onChange} />}
      />
    </Form>
  )
}

export default WriteForm
