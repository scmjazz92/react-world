import React from 'react'
import { AuthParams } from '../../apis/types'
import useForm from '../../hooks/useForm'
import { AppError, AppErrorMessage } from '../../lib/error'
import validate from '../../lib/validate'
import Form from '../@shared/Form'
import LabelInput from '../@shared/LabelInput'
import AuthAction from './AuthAction'

interface Props {
  submit(params: AuthParams, form: HTMLFormElement): void
  error?: AppError
}

const RegisterForm = ({ submit, error }: Props) => {
  const { inputProps, errors, disabled, handleSubmit } = useForm({
    form: {
      username: {
        validate: validate.username,
        errorMessage: '6~18자 사이의 영문/숫자/한글을 입력해주세요.',
      },
      password: {
        validate: validate.password,
        errorMessage: '8~12자, 영문/숫자/특수문자 중 2가지 이상 입력해주세요.',
      },
    },
  })

  const onSubmit = handleSubmit((params, event) => submit(params, event.target))

  return (
    <Form
      onSubmit={onSubmit}
      footer={
        <AuthAction
          mode="register"
          disabled={disabled}
          errorMessage={AppErrorMessage(error?.name)}
        />
      }
    >
      <LabelInput
        label="아이디"
        placeholder="아이디를 입력하세요."
        {...inputProps.username}
        errorMessage={errors.username}
      />
      <LabelInput
        label="비밀번호"
        placeholder="비밀번호를 입력하세요."
        type="password"
        {...inputProps.password}
        errorMessage={errors.password}
      />
    </Form>
  )
}

export default RegisterForm
