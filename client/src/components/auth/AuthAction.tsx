import { css } from '@emotion/react'
import React from 'react'
import { Link } from 'react-router-dom'
import colors from '../../lib/colors'
import Button from '../@shared/Button'

interface Props {
  mode: 'register' | 'login'
  errorMessage?: string
  disabled?: boolean
}

const descriptionMap = {
  register: {
    actionName: '회원가입',
    question: '계정이 이미 있으신가요?',
    questionLink: '/auth/login',
    questionLinkName: '로그인',
  },
  login: {
    actionName: '로그인',
    question: '계정이 없으신가요?',
    questionLink: '/auth/register',
    questionLinkName: '회원가입',
  },
}

const AuthAction = ({ mode, errorMessage, disabled }: Props) => {
  const { actionName, question, questionLink, questionLinkName } =
    descriptionMap[mode]

  return (
    <div>
      <Button type="submit" disabled={disabled} errorMessage={errorMessage}>
        {actionName}
      </Button>
      <p css={description}>
        {question} <Link to={questionLink}>{questionLinkName}</Link>
      </p>
    </div>
  )
}

const description = css`
  text-align: center;
  padding-top: 20px;
  font-size: 14px;

  & a {
    color: ${colors.blue100};
    text-decoration: underline;
  }
`

export default AuthAction
