import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { AuthParams } from '../../apis/types'
import BasicLayout from '../../components/@layout/BasicLayout'
import BlindHeading from '../../components/@shared/BlindHeading'
import RegisterForm from '../../components/auth/RegisterForm'
import HeaderBackButton from '../../components/header/HeaderBackButton'
import useRegister from '../../hooks/apis/auth/useRegister'
import useGoBack from '../../hooks/useGoBack'
import useMediaQuery from '../../hooks/useMediaQuery'
import { userSelector } from '../../recoils/user'

const Register = () => {
  const { isMobile } = useMediaQuery()
  const goBack = useGoBack()
  const navigate = useNavigate()
  const { mutate, error } = useRegister()
  const setUser = useSetRecoilState(userSelector)

  const onRegister = (params: AuthParams, form: HTMLFormElement) =>
    mutate(params, {
      onSuccess: ({ user }) => {
        setUser(user)
        navigate('/')
      },
      onError: () => {
        form.reset()
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur()
        }
      },
    })

  return (
    <BasicLayout title="회원가입" left={<HeaderBackButton onClick={goBack} />}>
      {!isMobile && <BlindHeading heading="회원가입" level={2} />}
      <RegisterForm submit={onRegister} error={error?.response?.data} />
    </BasicLayout>
  )
}

export default Register
