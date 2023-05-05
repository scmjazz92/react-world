import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthParams } from '../../apis/types'
import BasicLayout from '../../components/@layout/BasicLayout'
import RegisterForm from '../../components/auth/RegisterForm'
import HeaderBackButton from '../../components/header/HeaderBackButton'
import useRegister from '../../hooks/apis/auth/useRegister'
import useGoBack from '../../hooks/useGoBack'

const Register = () => {
  const goBack = useGoBack()
  const navigate = useNavigate()
  const { mutate, error } = useRegister()

  const onRegister = (params: AuthParams, form: HTMLFormElement) =>
    mutate(params, {
      onSuccess: () => navigate('/'),
      onError: () => form.reset(),
    })

  return (
    <BasicLayout title="회원가입" left={<HeaderBackButton onClick={goBack} />}>
      <RegisterForm submit={onRegister} error={error?.response?.data} />
    </BasicLayout>
  )
}

export default Register
