import React from 'react'
import { AuthParams } from '../../apis/types'
import useForm from '../../hooks/useForm'
import { AppError, AppErrorMessage } from '../../lib/error'
import Form from '../@shared/Form'
import LabelInput from '../@shared/LabelInput'
import AuthAction from './AuthAction'

interface Props {
  submit(params: AuthParams, form: HTMLFormElement): void
  error?: AppError
}

const LoginForm = ({ submit, error }: Props) => {
  const { inputProps, handleSubmit } = useForm({
    mode: 'submit',
    form: {
      username: {},
      password: {},
    },
  })

  const onSubmit = handleSubmit((params, event) => submit(params, event.target))

  return (
    <Form
      onSubmit={onSubmit}
      footer={
        <AuthAction mode="login" errorMessage={AppErrorMessage(error?.name)} />
      }
    >
      <LabelInput
        label="아이디"
        placeholder="아이디를 입력하세요."
        {...inputProps.username}
      />
      <LabelInput
        label="비밀번호"
        placeholder="비밀번호를 입력하세요."
        type="password"
        {...inputProps.password}
      />
    </Form>
  )
}

export default LoginForm
