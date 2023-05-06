import React from 'react'
import { AuthParams } from '../../apis/types'
import BasicLayout from '../../components/@layout/BasicLayout'
import LoginForm from '../../components/auth/LoginForm'
import HeaderBackButton from '../../components/header/HeaderBackButton'
import useLogin from '../../hooks/apis/auth/useLogin'
import useGoBack from '../../hooks/useGoBack'
import useRedirect from '../../hooks/useRedirect'

const Login = () => {
  const redirect = useRedirect()
  const goBack = useGoBack()
  const { mutate, error } = useLogin()

  const onLogin = (params: AuthParams, form: HTMLFormElement) =>
    mutate(params, {
      onSuccess: () => redirect(),
      onError: () => form.reset(),
    })

  return (
    <BasicLayout title="로그인" left={<HeaderBackButton onClick={goBack} />}>
      <LoginForm submit={onLogin} error={error?.response?.data} />
    </BasicLayout>
  )
}

export default Login
